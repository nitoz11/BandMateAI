import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { Midi } from "@tonejs/midi";

async function getAccessToken() {
  const response = await fetch(
    "https://iam.cloud.ibm.com/identity/token",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type:
          "urn:ibm:params:oauth:grant-type:apikey",
        apikey: process.env.IBM_API_KEY!,
      }),
    }
  );

  const data = await response.json();

  return data.access_token;
}

export async function POST(
  request: NextRequest
) {
  try {
    const formData =
      await request.formData();

    const audio =
      formData.get("audio");

      if (!audio) {
      return NextResponse.json(
        {
          error:
            "No audio file uploaded",
        },
        { status: 400 }
      );
    }

      const audioFile = audio as File;

const bytes = await audioFile.arrayBuffer();

const buffer = Buffer.from(bytes);

const uploadsDir = path.join(
  process.cwd(),
  "uploads"
);

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const audioPath = path.join(
  uploadsDir,
  audioFile.name
);

fs.writeFileSync(audioPath, buffer);

const outputDir = path.join(
  process.cwd(),
  "basic-pitch-output"
);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const basicPitchExe =
  "C:\\Users\\Amanda Gamba\\BandMateAI\\frontend\\basicpitch-env\\Scripts\\basic-pitch.exe";



const midiPath = path.join(
  outputDir,
  audioFile.name.replace(
    path.extname(audioFile.name),
    "_basic_pitch.mid"
  )
);

if (fs.existsSync(midiPath)) {
  fs.unlinkSync(midiPath);
  console.log("Deleted old MIDI file");
}

execSync(
  `"${basicPitchExe}" "${outputDir}" "${audioPath}"`,
  {
    stdio: "inherit",
  }
);


console.log("MIDI PATH:", midiPath);

const midiData = fs.readFileSync(
  midiPath
);

const midi = new Midi(midiData);

const notes =
  midi.tracks.flatMap(
    (track) => track.notes
  );

  const noteCount =
  notes.length;

  if (noteCount < 8) {
  return NextResponse.json({
    report: {
      mood: "Insufficient melody data",
      genre: "Unknown",
      instrument: "Unknown",
      feedback:
        "The uploaded recording did not contain enough detectable notes for analysis.",
      structure: "Unknown",
      ChordProgression: "Unknown",
      nextStep:
        "Record a clearer melody with humming, singing, or a single instrument."
    }
  });
}

console.log(
  "NOTE COUNT:",
  noteCount
);

const pitches = notes.map(
  (note) => note.midi
);

const durations = notes.map(
  (note) => note.duration
);

const rhythmSequence =
  durations
    .slice(0, 50)
    .map((d) => d.toFixed(2))
    .join(", ");

    console.log(
  "RHYTHM SEQUENCE:",
  rhythmSequence
);

const melodySequence =
  pitches.slice(0, 100).join(", ");

const highest =
  Math.max(...pitches);

const lowest =
  Math.min(...pitches);

console.log(
  "Highest:",
  highest
);

console.log(
  "Lowest:",
  lowest
);

const averagePitch =
  pitches.reduce(
    (a, b) => a + b,
    0
  ) / pitches.length;

console.log(
  "Average:",
  averagePitch
);

const noteRange =
  highest - lowest;

  const uniqueNotes =
  [...new Set(pitches)];

const repetitionRatio =
  (
    pitches.length /
    uniqueNotes.length
  ).toFixed(2);

  const averageDuration =
  durations.reduce(
    (a, b) => a + b,
    0
  ) / durations.length;

  console.log(
  "REPETITION:",
  repetitionRatio
);

console.log(
  "NOTE RANGE:",
  noteRange
);

console.log(
  "AVG DURATION:",
  averageDuration
);

const melodyData = `
Highest Note: ${highest}
Lowest Note: ${lowest}
Average Note: ${averagePitch}
Note Range: ${noteRange}
Total Notes: ${noteCount}
Repetition Ratio: ${repetitionRatio}
Average Note Duration:
${averageDuration.toFixed(2)}
Melody Note Sequence:
${melodySequence}

Rhythm Durations:
${rhythmSequence}
`;

    const description =
      formData.get("description");

    const token =
      await getAccessToken();

      const response = await fetch(
  `${process.env.IBM_URL}/ml/v1/text/generation?version=2023-05-29`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type":
        "application/json",
    },
    body: JSON.stringify({
      model_id:
        "meta-llama/llama-3-3-70b-instruct",

      project_id:
        process.env.IBM_PROJECT_ID,

      input: `
You are an expert music producer.

Analyze ONLY the melody data provided.

Melody Data:
${melodyData}

User Description:
${description}

You MUST infer:

- mood
- energy
- melodic movement
- repetition
- pitch range
- likely musical style

Return EXACTLY this format.

Mood: <one answer>

Genre: <best estimate>

Suggested Instrument: <one answer>

Producer Feedback: <2 sentences>

Song Structure: <one answer>

Chord Progression: <one answer>

Recommended Next Step: <one answer>

Rules:

- Never leave fields blank.
- Never write Additional Notes.
- Never ask questions.
- Never explain your reasoning.
- Output only the six fields.
Chord Progression Rules:

- Use standard chord names.
- Return 3 to 6 chords.
- Example: Am - F - C - G
- If uncertain, provide the most likely progression.
`,

      parameters: {
        decoding_method:
          "greedy",
        max_new_tokens: 150,
      },
    }),
  }
);

const result =
  await response.json();

  if (!result.results?.length) {
  console.error(
    "IBM Error:",
    JSON.stringify(result, null, 2)
  );

  return NextResponse.json(
    {
      error:
        "IBM did not return a valid response"
    },
    { status: 500 }
  );
}

  console.log("========== FULL IBM RESPONSE ==========");
console.log(JSON.stringify(result, null, 2));
console.log("=======================================");

const output =
  result.results?.[0]
    ?.generated_text ||
  "No response generated";

  console.log(
  "MELODY SEQUENCE:",
  melodySequence
);


  console.log("========== IBM OUTPUT ==========");
console.log(output);
console.log("================================");

    const mood =
  output.match(
    /Mood:\s*([^\n]*)/i
  )?.[1]?.trim() ||
  "Unknown";

const instrument =
  output.match(
    /Suggested Instrument:\s*([^\n]*)/i
  )?.[1]?.trim() ||
  "Unknown";

const genre =
  output.match(
    /Genre:\s*([^\n]*)/i
  )?.[1]?.trim() ||
  "Unknown";

const feedback =
  output.match(
    /Producer Feedback:\s*([\s\S]*?)(?=Song Structure:|$)/i
  )?.[1]?.trim() || "Unknown";

const structure =
  output.match(
    /Song Structure:\s*([^\n]*)/i
  )?.[1]?.trim() || "Unknown";

  const chordProgression =
  output.match(
    /Chord Progression:\s*([^\n]*)/i
  )?.[1]?.trim() ||
  "Unknown";

const nextStep =
  output.match(
    /Recommended Next Step:\s*([^\n]*)/i
  )?.[1]?.trim() || "Unknown";

return NextResponse.json({
  report: {
  mood,
  genre,
  suggestedInstrument: instrument,
  feedback,
  structure,
  chordProgression,
  nextStep,
},
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Melody analysis failed",
      },
      { status: 500 }
    );
  }
}