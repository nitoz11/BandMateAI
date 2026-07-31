import { NextRequest, NextResponse } from "next/server";

async function getAccessToken() {
  const response = await fetch(
    "https://iam.cloud.ibm.com/identity/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type:
          "urn:ibm:params:oauth:grant-type:apikey",
        apikey: process.env.IBM_API_KEY!,
      }),
    }
  );

  const data = await response.json();

  console.log("TOKEN RESPONSE:");
  console.log(JSON.stringify(data, null, 2));

  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    console.log("IBM URL:", process.env.IBM_URL);
console.log("PROJECT ID:", process.env.IBM_PROJECT_ID);
console.log("API KEY EXISTS:", !!process.env.IBM_API_KEY);
    const { description } = await req.json();

    const token = await getAccessToken();

    const response = await fetch(
      `${process.env.IBM_URL}/ml/v1/text/generation?version=2023-05-29`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_id: "meta-llama/llama-3-3-70b-instruct",

          project_id:
            process.env.IBM_PROJECT_ID,

          input: `
You are a professional music producer.

Analyze this song idea:

${description}

Return:
Genre:
Tempo:
Chords:
Mood:
Production Notes:
Commercial Potential:
          `,

          parameters: {
            decoding_method: "greedy",
            max_new_tokens: 300,
          },
        }),
      }
    );

    const result = await response.json();
    console.log(
  JSON.stringify(result, null, 2)
);

    const output =
  result.results?.[0]?.generated_text ||
  "No response generated";

console.log("AI OUTPUT:");
console.log(output);

const genre =
  output.match(/Genre:\s*(.*)/i)?.[1]?.trim() ||
  "Unknown";

const tempo =
  output.match(/Tempo:\s*(.*)/i)?.[1]?.trim() ||
  "Unknown";

const chords =
  output.match(/Chords:\s*(.*)/i)?.[1]?.trim() ||
  "Unknown";

const mood =
  output.match(/Mood:\s*(.*)/i)?.[1]?.trim() ||
  "Unknown";

const notes =
  output.match(/Production Notes:\s*(.*)/i)?.[1]?.trim() ||
  output;

const commercial =
  output.match(/Commercial Potential:\s*(.*)/i)?.[1]?.trim() ||
  "Unknown";

    return NextResponse.json({
  genre,
  tempo,
  chords,
  mood,
  notes,
  commercial,
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "IBM watsonx request failed" },
      { status: 500 }
    );
  }
}