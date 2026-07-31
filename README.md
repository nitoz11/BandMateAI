This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More
# BandMate AI 🎵

BandMate AI is an AI-powered music co-creation platform built for the IBM SkillsBuild AI Builders Challenge.

Users can hum a melody, upload an audio recording, and receive intelligent producer feedback, musical analysis, and creative suggestions powered by IBM watsonx.ai.

---

## Problem

Many aspiring musicians have musical ideas but lack the technical knowledge to:

- Identify the mood of a melody
- Develop song structures
- Choose instruments
- Build chord progressions
- Turn ideas into complete songs

BandMate AI acts as an AI music producer that helps transform rough melody ideas into production-ready concepts.

---

## Features

### 🎤 Melody Upload & Analysis

Users can:

- Upload hummed melodies
- Convert audio into MIDI using Basic Pitch
- Extract note sequences and rhythm information
- Analyze pitch range and repetition

### 🧠 AI Producer Agent

Powered by IBM watsonx.ai.

Generates:

- Mood analysis
- Genre suggestions
- Instrument recommendations
- Producer feedback
- Song structure ideas
- Recommended next steps

### 🎼 Chord Progression Suggestions

BandMate AI generates harmony suggestions based on melodic characteristics.

### 📊 Dashboard

Stores project information and allows users to continue developing musical ideas.

---

## Tech Stack

### Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

### AI

- IBM watsonx.ai
- Meta Llama 3.3 70B Instruct

### Audio Processing

- Spotify Basic Pitch
- MIDI Analysis
- ToneJS MIDI

---

## IBM Technology Used

BandMate AI uses:

- IBM watsonx.ai Foundation Models
- IBM Cloud IAM Authentication
- IBM Granite/Llama-powered music analysis workflows

---

## How It Works

1. User uploads a melody recording.
2. Basic Pitch converts audio into MIDI.
3. MIDI notes are extracted.
4. Melody statistics are generated.
5. IBM watsonx.ai analyzes the melody.
6. BandMate AI returns:
   - Mood
   - Genre
   - Instrument
   - Producer feedback
   - Song structure
   - Next production step

---

## Installation

```bash
git clone https://github.com/nitoz11/BandMateAI.git

cd BandMateAI

npm install

npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file:

```env
IBM_API_KEY=your_api_key

IBM_URL=your_watsonx_url

IBM_PROJECT_ID=your_project_id
```

---

## Future Improvements

- Full song generation
- Chord progression engine
- Lyrics generation
- AI aided beat creation and production
- Export to DAW formats
- Collaboration features

---

## Author

Benjamin Gamba 

Built for the IBM SkillsBuild AI Builders Challenge 2026.
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
