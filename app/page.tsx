import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-6xl font-bold mb-6">
          🎵 BandMate AI
        </h1>

        <p className="text-xl max-w-3xl mb-8">
          Turn melodies in your head into real music.
          Your AI co-producer from idea to ownership.
        </p>

        <Link href="/hum">
  <button className="bg-blue-600 px-6 py-3 rounded-xl text-lg">
    Start Creating
  </button>
</Link>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-10 pb-20">

        <Link href="/hum">
  <div className="border border-gray-700 rounded-2xl p-6 hover:border-blue-500 cursor-pointer">
    <h2 className="text-2xl font-bold mb-3">
      🎤 Hum a Melody
    </h2>

    <p>
      Hum, sing, or record a melody and let BandMate AI
      identify notes and recreate it using instruments.
    </p>
  </div>
</Link>

        <Link href="/producer">
  <div className="border border-gray-700 rounded-2xl p-6 hover:border-blue-500 cursor-pointer">
    <h2 className="text-2xl font-bold mb-3">
      🎛 Producer Agent
    </h2>

    <p>
      Explore genres, arrangements, beats,
      and production ideas through natural language.
    </p>
  </div>
</Link>

        <Link href="/rights">
  <div className="border border-gray-700 rounded-2xl p-6 hover:border-green-500 cursor-pointer">
    <h2 className="text-2xl font-bold mb-3">
      📜 Rights Assistant
    </h2>

    <p>
      Generate split sheets, copyright guidance,
      and ownership documentation.
    </p>
  </div>
</Link>

      </section>
    </main>
  );
}