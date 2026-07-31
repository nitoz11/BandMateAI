"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ARPage() {
  const [report, setReport] = useState<any>(null);
  const [savedProject, setSavedProject] = useState<any>(null);

  useEffect(() => {
    const project = localStorage.getItem("bandmateProject");

    if (project) {
      setSavedProject(JSON.parse(project));
    }
  }, []);

  const generateAR = async () => {
    const response = await fetch(
      "/api/producer/ar/granite",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          genre:
            savedProject?.producerAnalysis?.genre,
          mood:
            savedProject?.producerAnalysis?.mood,
          tempo:
            savedProject?.producerAnalysis?.tempo,
        }),
      }
    );

    const data = await response.json();

    setReport(data.analysis);

    localStorage.setItem(
      "bandmateProject",
      JSON.stringify({
        ...savedProject,
        arAnalysis: data.analysis,
      })
    );
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-6">
        🎯 A&R Agent
      </h1>

      {savedProject && (
        <div className="mb-6 border border-blue-600 p-4 rounded-lg">
          <p>
            Genre:
            {" "}
            {savedProject.producerAnalysis?.genre}
          </p>

          <p>
            Mood:
            {" "}
            {savedProject.producerAnalysis?.mood}
          </p>

          <p>
            Tempo:
            {" "}
            {savedProject.producerAnalysis?.tempo}
          </p>
        </div>
      )}

      <button
        onClick={generateAR}
        className="bg-blue-600 px-6 py-3 rounded-lg"
      >
        Generate A&R Report
      </button>

      {report && (
        <>
          <div className="mt-8 border border-gray-700 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">
              A&R Analysis
            </h2>

            <pre className="whitespace-pre-wrap">
              {report}
            </pre>
          </div>

          <Link href="/dashboard">
            <button className="mt-6 bg-green-600 px-6 py-3 rounded-lg">
              Update Dashboard →
            </button>
          </Link>
        </>
      )}
    </main>
  );
}