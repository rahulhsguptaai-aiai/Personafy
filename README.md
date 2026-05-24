# Personality Type Identifier 🌸

An outstanding, highly polished, offline-first Progressive Web Application (PWA) designed to identify, break down, and analyze psychological profiles based on the Myers-Briggs personality dimensions. 

This client-side application is engineered with a luxurious **"Natural Tones" design system**, utilizing soft warm backdrops, elegant serif typography, crisp micro-interactions, and instant-calculating scoring algorithms.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![Stack](https://img.shields.io/badge/stack-React%20%7C%20TypeScript%20%7C%20Tailwind%20%7C%20Framer--Motion-blue)](#)
[![Performance](https://img.shields.io/badge/performance-100%25-emerald)](#)
[![Privacy](https://img.shields.io/badge/privacy-100%25%20local-teal)](#)

---

## 🎯 Architecture & Design System

The application was strategically designed to prioritize distraction-free introspection and high behavioral retention. 

### 1. "Natural Tones" Visual Philosophy
* **Palette**: Generous utilization of organic warm off-whites (`#FBF9F6`), tranquil forest sage greens (`#7C8E79`), and deep charcoal earths (`#2D332D`) to foster comfort and calmness.
* **Typography**: Elegant, literary pairings featuring **Playfair Display** (italic serif headings for high narrative engagement) and **Inter** (monospace/sans-serif numeric axes and status displays to maximize scannability).
* **Adaptability**: Full viewport sizing fluidly supporting high-density desktop views (dual-grid dynamic layouts) and touch-optimized mobile screens with 44px+ custom targets.

### 2. The Local Engine (How It Works)
The applet operates with **zero external backend dependencies**. All logic is hardcoded inside static data pathways to ensure absolute privacy and sub-millisecond execution times.
* **Questionnaire Matrix**: 12 scenarios balanced beautifully across the 4 fundamental psychological axes:
  * **Social Energy (Extraversion vs. Introversion)**
  * **Information Gathering (Sensing vs. Intuition)**
  * **Decision Strategy (Thinking vs. Feeling)**
  * **Approach to Life (Judging vs. Perceiving)**
* **Calculation Math**: Each selection increments respective dimensional metrics with multi-level weights ($1$ to $2$), instantly outputting exact percentage points on the final results board.

---

## 🛠️ Technology Stack

```
                     ┌──────────────────────┐
                     │     index.html       │
                     └──────────┬───────────┘
                                │ (React 19 Entry)
                     ┌──────────▼───────────┐
                     │     src/main.tsx     │
                     └──────────┬───────────┘
                                │
                     ┌──────────▼───────────┐
                     │      src/App.tsx     │◀─── [Local Engine & State]
                     └────┬───────────────┬─┘
                          │               │
  ┌───────────────────────▼───────┐       └─────────────────────────────┐
  │      /components/             │                                     │
  │  ├─ StartScreen.tsx           │                        ┌────────────▼────────────┐
  │  ├─ ProgressBar.tsx           │                        │       /data/            │
  │  ├─ QuestionCard.tsx          │                        │  ├─ questions.ts         │
  │  └─ ResultsView.tsx           │                        │  └─ personalityTypes.ts │
  └───────────────────────────────┘                        └─────────────────────────┘
```

The codebase is built on top of high-performance development layers:
* **UI Library**: [React 19 (Functional Components & Hooks)](https://react.dev/) — utilized for clean, declarative rendering and lightweight state-variable coordination.
* **Language**: [TypeScript](https://www.typescriptlang.org/) — strictly typed model interfaces (`Dimension`, `QuizQuestion`, `UserResponse`) preventing downstream schema regressions.
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) — high-performance utility classes coupled with custom `@theme` directives.
* **Animation**: [Motion](https://motion.dev/) (formerly Framer Motion) — handles progressive entry, multi-tab transitions, custom staggering arrays, and dynamic height sliders.
* **Icons**: [Lucide React](https://lucide.dev/) — lightweight, beautiful stroke vector lines matching the organic theme.

---

## 🔮 AI Design & Synthesis
This project was synthesized, refactored, and crafted using **Google AI Studio** powered by state-of-the-art **Gemini** generative models. 
* **State Structuring**: Automated alignment of the 16 MBTI profile types into structured JSON schemas with custom tailored taglines, strengths, liabilities, ideal careers, and historic pairing insights.
* **Theme Styling Integration**: Algorithmic extraction of layout spacing and color matrices directly from design drafts to synthesize the **"Natural Tones"** signature theme seamlessly without breaking existing React states.

---

## 📲 Progressive Web App (PWA) Attributes
The application is pre-configured with a standard manifestation layer:
* **Standalone Execution**: Serves full-screen on portable devices, hiding browser chrome and search rails.
* **Responsive Assets**: References optimized fingerprint icons supporting modern desktop and mobile launcher environments.
* **Optimized Viewports**: Enforces strict user scales preventing layout breaking during interactive button tapping.

---

## 🚀 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* NPM or Yarn package manager

### 1. Installation
Clone your repository or extract the project folder, then install all base dependencies:
```bash
npm install
```

### 2. Running in Development
Boot up the fast local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the assigned Vite port) in your browser.

### 3. Creating a Production Build
Compile and bundle the static application into the `/dist` directory for static host deployments:
```bash
npm run build
```

---

## 🎨 Future Deployment Routes
Since the PWA operates completely in-browser, it has zero server hosting parameters. You can deploy it instantly on:
* **Vercel / Netlify / GitHub Pages** (using `/dist`)
* **Google Cloud Run** (utilizing the built-in Dockerfile config)
