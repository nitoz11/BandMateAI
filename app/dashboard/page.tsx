"use client";

import jsPDF from "jspdf";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("bandmateProject");

    if (saved) {
      setProject(JSON.parse(saved));
    }
  }, []);
  if (!project) {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold">
        Loading Project...
      </h1>
    </main>
  );
}
  const completion = project
  ? Math.round(
      ([project.melodyAnalysis,
        project.producerAnalysis,
        project.rightsReport
      ].filter(Boolean).length / 3) * 100
    )
  : 0;
  const readinessChecks = [
  project?.melodyAnalysis,
  project?.producerAnalysis,
  project?.rightsReport,
  project?.arAnalysis,
  project?.coverArtwork,
  project?.distributionPlatform,
];

const readiness = Math.round(
  (readinessChecks.filter(Boolean).length / 5) * 100
);
const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("BandMate AI Project Report", 20, 20);

  doc.setFontSize(12);

  doc.text(
    `Melody Mood: ${
      project?.melodyAnalysis?.mood || "Unknown"
    }`,
    20,
    40
  );

  doc.text(
    `Melody Genre: ${
      project?.melodyAnalysis?.genre || "Unknown"
    }`,
    20,
    50
  );

  doc.text(
    `Producer Genre: ${
      project?.producerAnalysis?.genre || "Unknown"
    }`,
    20,
    70
  );

  doc.text(
    `Tempo: ${
      project?.producerAnalysis?.tempo || "Unknown"
    }`,
    20,
    80
  );

  doc.text(
    `Rights Split: ${
      project?.rightsReport?.split || 0
    }%`,
    20,
    100
  );

  doc.save("BandMate-Report.pdf");
};

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-8">
        📊 BandMate Project Dashboard
      </h1>

      <div className="mb-8 p-6 bg-gray-900 rounded-xl border border-blue-600">
  <h2 className="text-2xl font-bold mb-3">
    🎵 BandMate Journey
  </h2>

  <div className="flex flex-wrap gap-4 text-lg">
    <span>🎤 Melody</span>
    <span>→</span>
    <span>🎛 Production</span>
    <span>→</span>
    <span>📜 Rights</span>
    <span>→</span>
    <span>🚀 Release</span>
  </div>
</div>
      <div className="mb-8">
  <h2 className="text-xl font-bold">
    Project Completion: {completion}%
  </h2>

  <div className="w-full bg-gray-800 rounded-full h-4 mt-2">
    <div
      className="bg-green-500 h-4 rounded-full"
      style={{ width: `${completion}%` }}
    />
  </div>
</div>
<button
  onClick={() => {
    const data = JSON.stringify(project, null, 2);

    const blob = new Blob([data], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "bandmate-project.json";
    a.click();

    URL.revokeObjectURL(url);
  }}
  className="mt-4 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
>
  Export Project
</button>

<button
  onClick={exportPDF}
  className="ml-4 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold"
>
  Export PDF
</button>

<div className="mt-8 bg-gray-900 p-6 rounded-xl border border-gray-700">
  <h2 className="text-2xl font-bold mb-4">
    🎯 AI Project Summary
  </h2>

  <p>
    <strong>Genre:</strong>{" "}
    {project?.producerAnalysis?.genre || "Unknown"}
  </p>

  <p>
    <strong>Mood:</strong>{" "}
    {project?.producerAnalysis?.mood || "Unknown"}
  </p>

  <p>
    <strong>Tempo:</strong>{" "}
    {project?.producerAnalysis?.tempo || "Unknown"}
  </p>

  <p className="mt-4">
    <strong>Suggested Audience:</strong>
    Festival-goers, streaming listeners,
    Afrohouse and electronic music fans.
  </p>

  <p className="mt-4">
    <strong>Similar Artists:</strong>
    Black Coffee, Shimza, Caiiro
  </p>

  <p className="mt-4 text-green-400">
    <strong>Release Recommendation:</strong>
    Spotify, Apple Music, Audiomack
  </p>
</div>
<div className="mt-8 bg-gray-900 p-6 rounded-xl border border-gray-700">
  <h2 className="text-2xl font-bold mb-4">
    🚀 Release Readiness
  </h2>

  <p className="text-green-400 font-semibold mb-4">
    {readiness}% Ready for Release
  </p>

  <ul className="space-y-2">
    <li>
      {project?.melodyAnalysis ? "✅" : "⬜"} Melody analyzed
    </li>

    <li>
      {project?.producerAnalysis ? "✅" : "⬜"} Production plan created
    </li>

    <li>
      {project?.rightsReport ? "✅" : "⬜"} Rights report completed
    </li>

    <li>
  {project?.arAnalysis ? "✅" : "⬜"} A&R analysis completed
</li>

    <li>
      ⬜ Cover artwork uploaded
    </li>

    <li>
      ⬜ Distribution selected
    </li>
  </ul>
</div>

      {!project ? (
        <p>No project found.</p>
      ) : (
        <div className="space-y-6">

          <div className="border border-blue-600 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Melody Analysis
            </h2>

            <p>
              <strong>Mood:</strong>{" "}
              {project.melodyAnalysis?.mood}
            </p>

            <p>
              <strong>Genre:</strong>{" "}
              {project.melodyAnalysis?.genre}
            </p>
          </div>

          <div className="border border-purple-600 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Producer Analysis
            </h2>

            <p>
              <strong>Genre:</strong>{" "}
              {project.producerAnalysis?.genre}
            </p>

            <p>
              <strong>Tempo:</strong>{" "}
              {project.producerAnalysis?.tempo}
            </p>

            <p>
              <strong>Mood:</strong>{" "}
              {project.producerAnalysis?.mood}
            </p>
          </div>

          <div className="border border-green-600 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Rights Report
            </h2>

            <p>
              <strong>Song:</strong>{" "}
              {project.rightsReport?.songTitle}
            </p>

            <p>
              <strong>Split:</strong>{" "}
              {project.rightsReport?.split}%
            </p>
          </div>

          <div className="border border-yellow-600 rounded-xl p-6">
  <h2 className="text-2xl font-bold mb-4">
    A&R Analysis
  </h2>

  <pre className="whitespace-pre-wrap">
    {project.arAnalysis}
  </pre>
</div>

        </div>
      )}
    </main>
  );
}