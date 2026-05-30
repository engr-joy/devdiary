"use client"
import { useEffect, useState } from "react"

const lines = [
  "Hi, Joy.",
  "Getting your workspace ready...",
  "Loading your progress...",
  "Setting up your dev diary...",
  "All done. Let's build something great today. 🚀",
]

export default function Home() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    lines.forEach((_, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i])
        if (i === lines.length - 1) {
          setTimeout(() => setShowButton(true), 800)
        }
      }, i * 1200)
    })
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-3">

      <div className="flex flex-col items-center gap-3 w-full max-w-md px-6">
        {lines.map((line, i) => (
          <p
            key={i}
            className={`text-center transition-all duration-700 ease-in-out ${
              visibleLines.includes(i)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            } ${i === 0
                ? "text-3xl font-semibold text-white"
                : i === lines.length - 1
                ? "text-base text-green-400"
                : "text-sm text-zinc-500"
            }`}
          >
            {line}
          </p>
        ))}

        {/* Progress bar */}
        <div className="w-48 h-0.5 bg-zinc-800 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-[6000ms] ease-in-out"
            style={{ width: visibleLines.length > 0 ? "100%" : "0%" }}
          />
        </div>

        {showButton && (
          <a href="/feed" className="mt-6 text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-6 py-2.5 rounded-lg transition-all duration-300">
            Open my diary →
          </a>
        )}
      </div>

    </div>
  )
}