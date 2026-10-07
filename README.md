# 25-Perspective Insight Engine

Look at any problem through **25 expert lenses**. Pick an expert (an Economist, a Systems Thinker, a Product Architect, a Venture Strategist, and more), and chat with them about your idea. Experts can see what the others said earlier in the conversation and build on it, so you get one connected discussion instead of 25 separate answers.

## The experts

A **General Partner** who coordinates, plus 25 specialists:

| Thinking & science | Business & product |
|---|---|
| Systems Thinker · Economist · Psychologist · Engineer · Strategist · Ethicist · Anthropologist · Futurist · Cognitive Scientist · Behavioral Scientist · Sociologist · Neuroscientist · Linguist · Epistemologist | Product Architect · Data Strategist · Compliance Specialist · AI Economist · CX Architect · Operations Architect · Agent Orchestrator · GTM Mechanic · Venture Strategist · Financial Modeler · Market Analyst |

## Features

- **Multiple conversations:** start a separate chat with any expert
- **Streaming replies:** answers appear as they're written
- **Shared context:** experts refer to each other ("Building on what the Economist said…")
- **Friendly tone:** plain language and analogies, with honest pushback when an idea has gaps
- **Reference knowledge:** an expert can be given a set of internal documents to draw on

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS · lucide-react · Google Gen AI SDK (`gemini-2.5-flash`, chat with streaming)

## Run locally

Requires Node.js 18+ and a Gemini API key (free at https://aistudio.google.com/apikey).

```bash
git clone https://github.com/shaikabdul185-arch/25-perspective-insight-engine.git
cd 25-perspective-insight-engine
npm install
cp .env.example .env.local   # then add your key
npm run dev
```

Open http://localhost:3000. Production build: `npm run build`.

## Project structure

```
App.tsx                           Conversations and chat state
analysisTools.ts                  The expert definitions and their instructions
components/InputForm.tsx          Message input and expert picker
components/PerspectiveCard.tsx    One expert's reply
components/SynthesisSection.tsx   Synthesis panel (not yet wired into the UI)
components/AdvancedToolsDisplay.tsx  Analysis-tools panel (not yet wired into the UI)
services/geminiService.ts         Streaming chat with per-expert system prompts
```

## A note on API keys

The key is bundled into the browser code at build time. That's fine for local use, but don't deploy a public build with your personal key in it.
