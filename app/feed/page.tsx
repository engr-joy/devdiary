"use client"
import { useState } from "react"

const trendingStacks = [
  {
    id: 1,
    rank: 1,
    stack: "n8n + AI Agents",
    heat: "🔥 Viral",
    source: "Trending on Threads · 4.2k mentions this week",
    jobs: "1,847 jobs on LinkedIn PH",
    description: "Everyone's building AI automation workflows. n8n is blowing up on social — devs are getting hired just for knowing this.",
    project: "AI-Powered Job Application Tracker",
    projectDesc: "Full-stack SaaS that auto-applies to jobs, tracks status, sends follow-ups via n8n. Covers: Next.js, FastAPI, PostgreSQL, OpenAI API, Docker, GitHub Actions.",
    tags: ["Next.js", "FastAPI", "n8n", "OpenAI", "Docker", "PostgreSQL"],
    color: "border-orange-500/30 bg-orange-500/5",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  },
  {
    id: 2,
    rank: 2,
    stack: "Next.js 15 + Supabase",
    heat: "📈 Rising",
    source: "Google Trends PH · +340% searches",
    jobs: "2,310 jobs on LinkedIn",
    description: "The go-to fullstack combo right now. Supabase replaced Firebase for most devs. Every startup is hiring for this.",
    project: "Real-time Developer Portfolio CMS",
    projectDesc: "Self-updating portfolio where your GitHub commits auto-populate your projects page. Covers: Next.js, Supabase, GitHub API, Tailwind, Vercel.",
    tags: ["Next.js 15", "Supabase", "TypeScript", "GitHub API", "Tailwind"],
    color: "border-blue-500/30 bg-blue-500/5",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    id: 3,
    rank: 3,
    stack: "Docker + GitHub Actions",
    heat: "⚡ High Demand",
    source: "Stack Overflow Survey 2025 · #2 most wanted",
    jobs: "3,100 jobs on LinkedIn",
    description: "Every company wants devs who can ship. CI/CD is now a baseline skill, not a bonus. Huge salary gap between devs who know this vs don't.",
    project: "Automated DevOps Dashboard",
    projectDesc: "Monitor all your deployments, test results, and uptime in one dashboard. Covers: Docker, GitHub Actions, Railway, React, WebSockets, Grafana.",
    tags: ["Docker", "GitHub Actions", "React", "WebSockets", "Railway"],
    color: "border-green-500/30 bg-green-500/5",
    badge: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  {
    id: 4,
    rank: 4,
    stack: "LangChain + Vector DBs",
    heat: "🧠 Emerging",
    source: "GitHub Trending · 12k stars this month",
    jobs: "890 jobs · very few PH devs have this",
    description: "AI dev skills are scarce in PH. If you learn RAG + vector search now, you're ahead of 95% of local devs. High leverage.",
    project: "Personal Knowledge Base with RAG",
    projectDesc: "Chat with your own notes, docs, and PDFs using AI. Covers: LangChain, Pinecone, Next.js, OpenAI, TypeScript, Redis.",
    tags: ["LangChain", "Pinecone", "OpenAI", "Next.js", "Redis", "TypeScript"],
    color: "border-purple-500/30 bg-purple-500/5",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    id: 5,
    rank: 5,
    stack: "React Native + Expo",
    heat: "📱 Steady Demand",
    source: "JobStreet PH · most requested mobile skill",
    jobs: "1,200 jobs on JobStreet PH",
    description: "One codebase for iOS and Android. Expo made it way easier. Local outsourcing companies constantly hire for this.",
    project: "Freelancer Time & Invoice Tracker",
    projectDesc: "Mobile app to track billable hours, generate invoices, and ping clients. Covers: React Native, Expo, Supabase, Stripe, Push Notifications.",
    tags: ["React Native", "Expo", "Supabase", "Stripe", "TypeScript"],
    color: "border-cyan-500/30 bg-cyan-500/5",
    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
]

export default function FeedPage() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<number | null>(null)
  const [saved, setSaved] = useState<number[]>([])

  const filtered = trendingStacks.filter(
    (s) =>
      s.stack.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  )

  async function startProject(item: typeof trendingStacks[0]) {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: item.project,
        description: item.projectDesc,
        stack: item.tags.join(", ")
      })
    })
    const project = await res.json()
    setSaved([...saved, item.id])
    alert(`✅ "${project.title}" saved to your projects!`)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Header */}
      <div className="border-b border-zinc-800 px-8 py-6 flex items-center justify-between">
        <div>
          <p className="text-zinc-500 text-xs font-mono mb-1">May 2026 · what the market wants right now</p>
          <h1 className="text-2xl font-semibold">What should you build today, Joy?</h1>
          <p className="text-zinc-400 text-sm mt-1">Live trending stacks + highly technical project ideas scoped for your level.</p>
        </div>
        <a href="/" className="text-xs text-zinc-600 hover:text-zinc-400 font-mono">← home</a>
      </div>

      <div className="flex min-h-screen">

        {/* Feed */}
        <div className="flex-1 p-8 max-w-2xl">

          {/* Search */}
          <div className="relative mb-6">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by stack or technology... e.g. Docker, React, Python"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-zinc-600 transition-colors"
            />
          </div>

          {/* Stack cards */}
          <div className="flex flex-col gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelected(selected === item.id ? null : item.id)}
                className={`border rounded-xl p-5 cursor-pointer transition-all duration-200 ${item.color} ${selected === item.id ? "ring-1 ring-white/20" : "hover:border-zinc-600"}`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-600 font-mono text-xs">#{item.rank}</span>
                    <h2 className="text-base font-semibold">{item.stack}</h2>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border font-mono flex-shrink-0 ${item.badge}`}>
                    {item.heat}
                  </span>
                </div>

                <p className="text-xs text-zinc-500 mb-1">📡 {item.source}</p>
                <p className="text-xs text-zinc-500 mb-3">💼 {item.jobs}</p>
                <p className="text-sm text-zinc-300 leading-relaxed mb-3">{item.description}</p>

                <div className="flex gap-2 flex-wrap">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                {selected === item.id && (
                  <div className="mt-4 pt-4 border-t border-zinc-700">
                    <p className="text-xs text-zinc-500 font-mono mb-1">suggested project</p>
                    <p className="text-sm font-semibold text-white mb-2">🛠 {item.project}</p>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.projectDesc}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); startProject(item) }}
                      disabled={saved.includes(item.id)}
                      className="mt-4 text-xs bg-green-500 hover:bg-green-400 disabled:bg-zinc-700 disabled:text-zinc-500 text-black font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      {saved.includes(item.id) ? "✓ Saved!" : "Start this project →"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-64 border-l border-zinc-800 p-6 hidden lg:block">
          <p className="text-xs text-zinc-600 font-mono mb-4">how to use</p>
          <div className="flex flex-col gap-4 text-xs text-zinc-500 leading-relaxed">
            <p>① Browse trending stacks scraped from Google Trends, Threads, and Stack Overflow.</p>
            <p>② Click any card to see a highly technical project idea that covers all the topics.</p>
            <p>③ Use the search bar to filter by your preferred stack.</p>
            <p>④ Hit "Start this project" to save it and begin tracking your build.</p>
          </div>
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <p className="text-xs text-zinc-600 font-mono mb-2">last scraped</p>
            <p className="text-xs text-green-400 font-mono">Today · 8:00 AM</p>
            <p className="text-xs text-zinc-600 mt-1">via n8n workflow</p>
          </div>
        </div>

      </div>
    </div>
  )
}