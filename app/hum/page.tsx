"use client";

import { useState } from "react";
import Link from "next/link";

export default function HumPage() {
   const [analysis, setAnalysis] = useState<any>(null);
const [audioFile, setAudioFile] = useState<File | null>(null);
const [loading, setLoading] = useState(false);
const [description, setDescription] = useState("");
 const analyzeMelody = async () => {
  if (!audioFile) {
  alert("Please select an audio file first.");
  return;
}

if (!description.trim()) {
  alert("Please describe your melody idea.");
  return;
}

  try {
    setLoading(true);

    const formData = new FormData();

formData.append("audio", audioFile);

formData.append(
  "description",
  description
);

    const response = await fetch("/api/producer", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setAnalysis(data.report);
    localStorage.setItem(
  "bandmateProject",
  JSON.stringify({
    melodyAnalysis: data.report,
    audioFileName: audioFile?.name,
    lastUpdated: new Date().toISOString(),
  })
);
  } catch (error) {
    console.error(error);
    alert("Analysis failed.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-6">
        🎤 Hum a Melody
      </h1>

      <p className="mb-8">
        Upload or record a melody and let BandMate AI recreate it.
      </p>
      <label className="block font-semibold mb-2">
  Describe Your Melody Idea
</label>

<textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={4}
  placeholder="Example: Emotional Afrohouse anthem with uplifting piano and festival energy."
  className="w-full max-w-3xl p-4 bg-white text-black border border-gray-300 rounded-lg mb-6"
/>

      <input
  type="file"
  accept="audio/*"
  className="
    mb-6
    block
    w-full
    max-w-3xl
    text-sm
    text-gray-300
    file:mr-4
    file:py-3
    file:px-5
    file:rounded-lg
    file:border-0
    file:bg-blue-600
    file:text-white
    hover:file:bg-blue-700
    border
    border-gray-700
    rounded-lg
    p-2
  "
  onChange={(e) => {
    const file = e.target.files?.[0];

    if (file) {
      setAudioFile(file);
    }
  }}
/>

{audioFile && (
  <div className="mb-6 bg-green-900 border border-green-500 rounded-lg p-3">
    <p className="text-green-300 font-semibold">
      ✓ Audio Selected
    </p>

    <p className="text-white">
      {audioFile.name}
    </p>
  </div>
)}

{audioFile && (
  <audio
    controls
    className="w-full max-w-3xl mt-4"
    src={URL.createObjectURL(audioFile)}
  />
)}

      <button
  onClick={analyzeMelody}
  disabled={loading}
  className="bg-blue-600 px-6 py-3 rounded-lg disabled:opacity-50"
>
  {loading ? "Analyzing..." : "Analyze Melody"}
</button>
{analysis && (
  <div className="mt-8 bg-gray-900 p-6 rounded-xl border border-gray-700">
    <h2 className="text-2xl font-bold mb-4">
      Melody Analysis Complete
    </h2>

    <div className="space-y-4">
  <div>
    <h3 className="font-bold">🎭 Mood</h3>
    <p>{analysis.mood}</p>
  </div>

  <div>
    <h3 className="font-bold">🎸 Suggested Instrument</h3>
    <p>{analysis.suggestedInstrument}</p>
  </div>

  <div>
    <h3 className="font-bold">🎵 Genre Match</h3>
    <p>{analysis.genre}</p>
  </div>

  <div>
    <h3 className="font-bold">🧠 Producer Feedback</h3>
    <p>{analysis.feedback}</p>
  </div>

  <div>
  <h3 className="font-bold">🏗 Song Structure</h3>
  <p>{analysis.structure}</p>
</div>

<div>
  <h3 className="font-bold">🎹 Chord Progression</h3>
  <p>{analysis.chordProgression}</p>
</div>

<div>
  <h3 className="font-bold">🚀 Recommended Next Step</h3>
  <p>{analysis.nextStep}</p>
</div>
</div>
  </div>
)}
{analysis && (
  <div className="mt-6">
    <Link href="/producer">
      <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold">
        Continue to Producer Agent →
      </button>
    </Link>
  </div>
)}
    </main>
  );
}