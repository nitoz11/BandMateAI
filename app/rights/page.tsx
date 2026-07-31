"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function RightsPage() {
  const [songTitle, setSongTitle] = useState("");
  const [writers, setWriters] = useState("");
  const [producers, setProducers] = useState("");
  const [report, setReport] = useState<any>(null);
  const [savedProject, setSavedProject] = useState<any>(null);

useEffect(() => {
  const project = localStorage.getItem("bandmateProject");

  if (project) {
    const parsed = JSON.parse(project);

    setSavedProject(parsed);

    if (parsed.producerAnalysis?.genre) {
      setSongTitle(
        `${parsed.producerAnalysis.genre} Demo`
      );
    }
  }
}, []);

  const generateRights = async () => {
  const writerList = writers
    .split(",")
    .filter((w) => w.trim() !== "");

  const producerList = producers
    .split(",")
    .filter((p) => p.trim() !== "");
   
 const response = await fetch(
  "/api/producer/rights/granite",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      songTitle,
      writers,
      producers,
    }),
  }
);

const aiData = await response.json();

console.log(aiData);

  const totalPeople =
    writerList.length + producerList.length;

  const split =
    totalPeople > 0
      ? Math.floor(100 / totalPeople)
      : 0;

  const contributors = [
    ...writerList,
    ...producerList
  ];

  const rightsReport = {
    songTitle,
    writers: writerList,
    producers: producerList,
    contributors,
    split,
    aiAnalysis: aiData.analysis || "No AI advice generated",
    copyrightChecklist: [
      "Document all contributors",
      "Keep proof of creation",
      "Register copyright",
      "Store collaboration agreements"
    ],
    releaseChecklist: [
      "Confirm ownership splits",
      "Prepare cover artwork",
      "Upload to distributor",
      "Register with collection societies"
    ]
  };

  setReport(rightsReport);

  localStorage.setItem(
    "bandmateProject",
    JSON.stringify({
      ...savedProject,
      rightsReport,
    })
  );
};

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-6">
        📜 Rights Assistant
      </h1>
      {savedProject && (
  <div className="mb-6 p-4 border border-green-600 rounded-lg">
    <h2 className="text-xl font-bold mb-2">
      Imported Project
    </h2>

    <p>
      <strong>Melody Mood:</strong>{" "}
      {savedProject.melodyAnalysis?.mood}
    </p>

    <p>
      <strong>Melody Genre:</strong>{" "}
      {savedProject.melodyAnalysis?.genre || "N/A"}
    </p>

    <p>
      <strong>Producer Genre:</strong>{" "}
      {savedProject.producerAnalysis?.genre || "N/A"}
    </p>

    <p>
      <strong>Tempo:</strong>{" "}
      {savedProject.producerAnalysis?.tempo || "N/A"}
    </p>
  </div>
)}

      <div className="space-y-4 max-w-2xl">
        <label className="block font-semibold">
  Song Title
</label>
        <input
  type="text"
  placeholder="Song Title"
  value={songTitle}
  onChange={(e) => setSongTitle(e.target.value)}
  className="w-full p-3 mb-4 bg-white text-black border border-gray-300 rounded-lg placeholder-gray-500"
/>

<label className="block font-semibold">
  Writers
</label>
<input
  type="text"
  placeholder="Writers (comma separated)"
  value={writers}
  onChange={(e) => setWriters(e.target.value)}
  className="w-full p-3 mb-4 bg-white text-black border border-gray-300 rounded-lg placeholder-gray-500"
/>

<label className="block font-semibold">
  Producers
</label>
<input
  type="text"
  placeholder="Producers (comma separated)"
  value={producers}
  onChange={(e) => setProducers(e.target.value)}
  className="w-full p-3 mb-4 bg-white text-black border border-gray-300 rounded-lg placeholder-gray-500"
/>
          
        <button
  onClick={generateRights}
  className="mt-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
>
    Generate Rights Report
</button>
      </div>

      {report && (
  <div className="mt-8 bg-gray-900 p-6 rounded-xl border border-gray-700">
    <h2 className="text-2xl font-bold mb-4">
      Rights Report
    </h2>

          <div className="space-y-2">
  <p>
    <strong>Song Title:</strong> {report.songTitle}
  </p>

  <p>
    <strong>Writers:</strong> {report.writers.join(", ")}
  </p>

  <p>
    <strong>Producers:</strong> {report.producers.join(", ")}
  </p>

  <p className="text-green-400 font-semibold">
  Suggested Split: {report.split}% each contributor
  </p>
</div>

          <h3 className="font-bold mt-4">
            Copyright Checklist
          </h3>

          <ul className="list-disc ml-6">
            {report.copyrightChecklist.map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>

          <h3 className="font-bold mt-4">
            Release Checklist
          </h3>

          <ul className="list-disc ml-6">
            {report.releaseChecklist.map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
          
<div className="mt-6">
  <h3 className="font-bold text-xl mb-2">
    AI Rights Advisor
  </h3>

  <div className="bg-black p-4 rounded-lg border border-gray-700">
    <pre className="whitespace-pre-wrap text-gray-300">
      {report.aiAnalysis}
    </pre>
  </div>
</div>
          <div className="mt-6">
  <Link href="/dashboard">
    <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold">
      View Project Dashboard →
    </button>
  </Link>
</div>
        </div>
      )}
    </main>
  );
}