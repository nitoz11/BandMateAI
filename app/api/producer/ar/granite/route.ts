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
    const {
  genre,
  mood,
  tempo,
} = await req.json();
console.log("A&R REQUEST:");
console.log({ genre, mood, tempo });

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
You are a professional music A&R executive.

Analyze this project.

Genre:
${genre}

Mood:
${mood}

Tempo:
${tempo}

Provide:

Target Audience:
Similar Artists:
Playlist Opportunities:
Marketing Strategy:
Release Timing:
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


    return NextResponse.json({
  analysis: output,
});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "IBM watsonx request failed" },
      { status: 500 }
    );
  }
}