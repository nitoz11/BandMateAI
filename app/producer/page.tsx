"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProducerPage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
const [description, setDescription] = useState("");
const [report, setReport] = useState<any>(null);
const [savedProject, setSavedProject] = useState<any>(null);
const generateIdeas = async () => {
  if (
    !description.trim() &&
    !audioFile &&
    !savedProject
  ) {
    alert(
      "Please describe your song or upload a file."
    );
    return;
  }

  try {
    const response = await fetch("/api/producer/granite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
      }),
    });

    if (!response.ok) {
  throw new Error("Granite API request failed");
}

const data = await response.json();
    setReport(data);

    localStorage.setItem(
      "bandmateProject",
      JSON.stringify({
        ...savedProject,
        producerAnalysis: data,
      })
    );
  } catch (error) {
    console.error(error);
    alert("Failed to generate production ideas.");
  }
};
useEffect(() => {
  const project = localStorage.getItem("bandmateProject");

  if (project) {
    setSavedProject(JSON.parse(project));
  }
}, []);
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-6">
        🎛 Producer Agent
      </h1>

      <p className="mb-6">
  Describe your musical vision and optionally upload a beat, loop, or demo. BandMate AI will generate production ideas and suggestions to bring your vision to life.
</p>

{savedProject && (
  <div className="mb-6 p-4 border border-blue-600 rounded-lg">
    <h2 className="text-xl font-bold mb-2">
  Previous Melody Analysis
</h2>

<p className="text-green-400 mt-2">
  ✓ Melody imported from Hum a Melody
</p>

    <p>
      <strong>File:</strong>{" "}
      {savedProject.audioFileName}
    </p>

    <p>
      <strong>Mood:</strong>{" "}
      {savedProject.melodyAnalysis?.mood || "Unknown"}
    </p>

    <p>
      <strong>Genre:</strong>{" "}
      {savedProject.melodyAnalysis?.genre || "Unknown"}
    </p>
  </div>
)}
<label className="block font-semibold mb-2">
  Describe Your Musical Vision
</label>

<textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full max-w-3xl p-4 bg-white text-black border border-gray-300 rounded-lg mb-6 placeholder-gray-500"
  rows={5}
  placeholder="Example: I want an Afrohouse song with emotional piano chords and a festival vibe."
/>

<label className="block font-semibold mb-2">
  Upload Beat / Loop / Demo (Optional)
</label>

<input
  type="file"
  accept="audio/*"
  className="mb-4 block w-full max-w-3xl text-sm text-gray-300
             file:mr-4 file:py-2 file:px-4
             file:rounded-lg file:border-0
             file:bg-blue-600 file:text-white
             hover:file:bg-blue-700"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  }}
/>

{audioFile && (
  <p className="mb-4 text-green-400">
    Selected File: {audioFile.name}
  </p>
)}

<button
  onClick={generateIdeas}
  className="bg-blue-600 px-6 py-3 rounded-xl"
>
  Generate Production Ideas
</button>

      {report && (
  <>
    <div className="mt-10 border border-gray-700 rounded-xl p-6 max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">
        Producer Analysis
      </h2>

      <p>
        <strong>Genre:</strong> {report.genre}
      </p>

      <p>
        <strong>Tempo:</strong> {report.tempo}
      </p>

      <p>
        <strong>Chords:</strong> {report.chords}
      </p>

      <p>
        <strong>Mood:</strong> {report.mood}
      </p>

      <p>
        <strong>Production Notes:</strong> {report.notes}
      </p>

      <p className="text-green-400 mt-4">
        <strong>Commercial Potential:</strong> {report.commercial}
      </p>
    </div>

    <div className="mt-6">
      <Link href="/rights">
        <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold">
          Continue to Rights Assistant →
        </button>
      </Link>
    </div>
  </>
)}
    </main>
  );
}