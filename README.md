# BandMate AI 🎵

BandMate AI is an AI-powered music co-creation platform built for the IBM SkillsBuild AI Builders Challenge.

Users can hum a melody, upload an audio recording, and receive intelligent producer feedback and play around with the beat or melody by giving inputs of what they want to do, musical analysis, and creative suggestions powered by IBM watsonx.ai.

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
- Convert audio into MIDI using Spotify Basic Pitch
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
- ToneJS MIDI

---

## IBM Technology Used

- IBM watsonx.ai Foundation Models
- IBM Cloud IAM Authentication
- IBM Foundation Model APIs

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
   - Recommended next step

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
- Advanced chord progression engine
- Lyrics generation
- AI aided beat creation and production
- DAW export support
- Collaboration features

---

## Author

Benjamin Gamba

Built for the IBM SkillsBuild AI Builders Challenge 2026.
