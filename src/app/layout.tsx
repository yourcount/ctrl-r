import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ctrl+r – Digitale vernieuwing voor cultuur",
  description:
    "ctrl+r helpt kunstenaars en culturele makers met doordachte websites, digitale strategie en duurzaam beheer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Aurora achtergrond zoals in de originele site */}
        <div className="aurora-background" />
        {/* Interactieve achtergrondlijnen en custom cursor containers */}
        <div id="background-lines" className="fixed inset-0 -z-20 pointer-events-none" />
        <div
          id="custom-cursor"
          className="fixed top-0 left-0 z-50 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-accent) pointer-events-none"
        />
        <div
          id="cursor-follower"
          className="fixed top-0 left-0 z-50 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-(--color-accent) pointer-events-none"
        />
        {/* Zwevend editorpaneel voor de titel */}
        <div
          id="title-editor-panel"
          className="fixed bottom-8 left-1/2 z-40 w-72 -translate-x-1/2 translate-y-12 space-y-4 rounded-lg border border-white/10 bg-black/70 p-4 text-left text-xs text-(--color-text) opacity-0 shadow-lg backdrop-blur pointer-events-none"
        >
          <div className="space-y-1">
            <label htmlFor="distortion-slider" className="font-semibold">
              Vloeibaarheid
            </label>
            <input
              type="range"
              id="distortion-slider"
              min={0}
              max={40}
              defaultValue={0}
              className="range-slider"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="stretch-slider" className="font-semibold">
              Zwaartekracht
            </label>
            <input
              type="range"
              id="stretch-slider"
              min={0.5}
              max={2}
              step={0.01}
              defaultValue={1}
              className="range-slider"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="chaos-slider" className="font-semibold">
              Chaos
            </label>
            <input
              type="range"
              id="chaos-slider"
              min={0}
              max={10}
              defaultValue={0}
              className="range-slider"
            />
          </div>
          <button
            id="reset-title-style"
            className="mt-2 w-full border-t border-white/10 pt-2 text-center text-(--color-text)/70 transition hover:text-(--color-accent)"
          >
            Reset
          </button>
        </div>

        {/* SVG filter voor liquid effect */}
        <svg className="absolute h-0 w-0">
          <filter id="liquid-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.03"
              numOctaves={1}
              result="warp"
            />
            <feDisplacementMap
              xChannelSelector="R"
              yChannelSelector="G"
              scale={20}
              in="SourceGraphic"
              in2="warp"
            />
          </filter>
        </svg>

        {children}
      </body>
    </html>
  );
}
