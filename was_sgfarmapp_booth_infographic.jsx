import {
  Fish,
  Trophy,
  ClipboardList,
  Gauge,
  WifiOff,
  ScanLine,
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
  Timer,
  MessageSquare,
  CalendarCheck,
  Sparkles,
} from "lucide-react";

export default function WasSgFarmAppBoothInfographic() {
  const pillars = [
    {
      icon: ClipboardList,
      title: "Less manual farm admin",
      text: "Show that daily farm records can be faster, cleaner, and easier to capture.",
    },
    {
      icon: Fish,
      title: "Real operational traceability",
      text: "Demonstrate how batches, locations, and farm events can stay linked over time.",
    },
    {
      icon: Gauge,
      title: "Useful farm insights",
      text: "Help visitors see that better records lead to better visibility and decisions.",
    },
    {
      icon: WifiOff,
      title: "Field-ready reliability",
      text: "Make offline-resilient workflows feel concrete rather than theoretical.",
    },
  ];

  const games = [
    {
      name: "Daily Log Quest",
      time: "1–2 min",
      fit: "Best for quick engagement",
      goal: "Gamify daily log completion by turning routine actions into a multi-tier streak ladder.",
      teaches: ["daily habits", "log completion", "farm routine"],
      whyItWorks: "Uses existing metrics to provide instant, loud animated feedback without backend changes.",
      capture: "QR for app trial + streak challenge",
      effort: "Low: Reuses existing 'todayLogCount' from HomeViewModel. Just needs the new UI Overlay + Lottie animations.",
    },
    {
      name: "Ops Bingo",
      time: "2–3 min",
      fit: "Best for exploring features",
      goal: "Encourage workers to explore different log types (Feed, Grade, Sample) to fill a Bingo card.",
      teaches: ["feature discovery", "workflow variety", "comprehensive logging"],
      whyItWorks: "Drives horizontal adoption using chunky, tactile UI tiles and confetti rewards.",
      capture: "QR for full feature list + demo",
      effort: "Medium: Requires a new bottom sheet UI and querying 6 existing local DAOs to determine tile states.",
    },
    {
      name: "Sync Clean Badge",
      time: "1 min",
      fit: "Best trust builder",
      goal: "Gamify offline-first hygiene by rewarding workers when they clear all pending records.",
      teaches: ["offline logging", "sync habits", "field reliability"],
      whyItWorks: "Turns a mundane data sync action into a satisfying, badge-earning moment.",
      capture: "Badge or QR at sync station",
      effort: "Low: Hooks directly into existing CacheSyncManager completion callbacks. Minor UI overlay work.",
    },
    {
      name: "Sampling Micro-Quiz",
      time: "1–2 min",
      fit: "Best for deeper conversations",
      goal: "Reinforce biological concepts with a quick 5-second educational popup after a workflow.",
      teaches: ["SGR/FCR concepts", "data validation", "fish growth"],
      whyItWorks: "Contextual learning tied directly to the data just entered, making it highly relevant.",
      capture: "Persona-tagged lead capture",
      effort: "Medium: Requires intercepting the existing ReviewSubmitStep with a new conditional sliding card UI.",
    },
  ];

  const boothFlow = [
    {
      title: "1. Stop",
      text: "Hook them in 3 seconds. 'Play a farm game in under 3 minutes.'",
    },
    {
      title: "2. Play",
      text: "Run one short activity tied directly to a real farm operation.",
    },
    {
      title: "3. Learn",
      text: "Connect the game to a product takeaway in 30 seconds.",
    },
    {
      title: "4. Convert",
      text: "Capture the lead, tag interest, and book the next step.",
    },
  ];

  const staffing = [
    {
      role: "Greeter",
      text: "Pulls traffic with a hook, not a pitch.",
    },
    {
      role: "Game Coach",
      text: "Runs the activity and keeps the pace high.",
    },
    {
      role: "Closer",
      text: "Connects value, qualifies, and secures follow-up.",
    },
  ];

  const successMetrics = [
    {
      label: "Traffic Stopped",
      detail: "Is the booth message interrupting the aisle?",
    },
    {
      label: "Games Played",
      detail: "Is the activity attractive enough to convert attention?",
    },
    {
      label: "Leads Captured",
      detail: "Are we producing usable contacts for follow-up?",
    },
    {
      label: "Meetings Booked",
      detail: "Are games generating commercial conversations?",
    },
    {
      label: "Top Workflows",
      detail: "Which topics resonate most (feeding, offline, etc)?",
    },
    {
      label: "Lead Quality",
      detail: "Are we attracting farmers, partners, or regulators?",
    },
  ];

  const remember = [
    "Support real farm workflows, not just office reporting.",
    "Make daily logs (feed, harvest, mortality) fast and consistent.",
    "Prove offline-resilient behaviour actually works in the field.",
    "Show how better records create better traceability.",
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-7xl mx-auto p-6 lg:p-12 space-y-12">
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_24%)]" />
          <div className="relative grid lg:grid-cols-[1.35fr_0.75fr] gap-6 p-8 md:p-10">
            <div>
              <div className="flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.24em] text-white/80">
                <Sparkles className="h-4 w-4" /> Dex × SGFarmApp × WAS
              </div>
              {/* Gamification Callout */}
              <div className="col-span-1 md:col-span-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-lg mt-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-black mb-2 tracking-tight">Real-Time Leaderboard App</h2>
                    <p className="text-emerald-50 text-sm leading-relaxed max-w-2xl font-medium">
                      A standalone React web app displayed on a TV at the booth. It polls the Gamification Service to show live rankings of the Top 10 loggers, active Bingo boards, and a scrolling activity feed—driving competitive engagement without touching the core backend.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-block bg-white text-teal-700 font-black px-6 py-3 rounded-xl text-sm uppercase tracking-widest shadow-sm">
                      Live on Booth TV
                    </span>
                  </div>
                </div>
              </div>
              <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
                A clearer booth strategy: use mini-games to turn curiosity into product understanding.
              </h1>
              <p className="mt-5 text-base md:text-lg leading-8 text-white/90 max-w-3xl">
                The goal is not just to attract booth traffic. The goal is to help visitors quickly understand
                that SGFarmApp makes aquaculture data collection easier, more traceable, and more useful.
              </p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {[
                  "short games",
                  "real farm workflows",
                  "faster understanding",
                  "qualified leads",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/25 bg-white/15 px-5 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/25 cursor-default hover:scale-105"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white/10 backdrop-blur-xl border border-white/20 p-8 self-center lg:mt-0 mt-4 shadow-3xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <div className="text-xs uppercase tracking-[0.2em] font-bold text-white/70">The core outcome</div>
              </div>
              <div className="text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                Make SGFarmApp feel easy, useful, and credible in under 5 minutes.
              </div>
              <div className="mt-8 space-y-3">
                {[
                  "Better than a static product pitch",
                  "Better than a passive screen demo",
                  "Designed to create follow-up conversations"
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3 rounded-2xl bg-white/5 py-3.5 px-5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-sm font-medium text-white/90">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-[2.5rem] bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 transition-all hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
            <div className="flex items-center gap-4 mb-8">
              <div className="rounded-2xl bg-emerald-600 p-3 shadow-lg shadow-emerald-200">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Key Booth Message</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {pillars.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="group rounded-3xl bg-slate-50/50 border border-slate-200 p-6 transition-all hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 cursor-default h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-2xl bg-emerald-100 text-emerald-700 p-3 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-lg font-bold leading-tight group-hover:text-emerald-900">{item.title}</div>
                    </div>
                    <div className="text-sm text-slate-500 leading-relaxed transition-colors group-hover:text-slate-600">{item.text}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-slate-900 text-white shadow-2xl p-8 md:p-10 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="rounded-2xl bg-cyan-500 p-3 shadow-lg shadow-cyan-900/40">
                  <MessageSquare className="h-6 w-6 text-slate-950" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Core Takeaway</h2>
              </div>
              <div className="space-y-4">
                {remember.map((item) => (
                  <div key={item} className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-cyan-500/30 flex items-start gap-4">
                    <div className="h-6 w-6 shrink-0 mt-0.5 rounded-full border border-cyan-500/50 flex items-center justify-center text-[10px] font-bold text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity">
                      ✓
                    </div>
                    <div className="text-sm md:text-base font-medium leading-relaxed text-slate-300 group-hover:text-white transition-colors">
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-auto pt-8">
              <div className="rounded-[2rem] bg-cyan-400 text-slate-950 p-6 shadow-xl shadow-cyan-950/20">
                <div className="text-xs font-bold uppercase tracking-[0.25em] opacity-60 mb-2">Focus on clarity</div>
                <div className="text-sm md:text-lg font-bold leading-snug">
                  The games are only the hook. Their real purpose is to make the app’s value obvious fast.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[3rem] bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:p-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1 w-8 rounded-full bg-emerald-600" />
                <div className="text-sm uppercase tracking-[0.25em] text-emerald-700 font-bold">Engagement Layer</div>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Recommended Mini-Games</h2>
            </div>
            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 px-6 py-3 text-sm font-bold shadow-sm">
              4 Distinct Conversational Hooks
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {games.map((game) => (
              <div key={game.name} className="group flex flex-col h-full rounded-[2.5rem] border border-slate-200 bg-slate-50/30 p-7 transition-all hover:bg-white hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/10">
                <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                  <div className="space-y-1">
                    <div className="text-xl font-extrabold leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-emerald-700">{game.name}</div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-semibold uppercase tracking-wider">
                      <Timer className="h-4 w-4" /> {game.time}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-xl bg-slate-900 text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider shadow-lg mt-1">
                    {game.fit}
                  </span>
                </div>

                <div className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                  {game.goal}
                </div>

                <div className="mt-auto space-y-6">
                  <div className="rounded-3xl bg-white/80 border border-slate-200 p-5 shadow-sm">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-extrabold mb-4">Core Concepts</div>
                    <div className="flex flex-wrap gap-2">
                      {game.teaches.map((item) => (
                        <span key={item} className="rounded-lg bg-emerald-50 border border-emerald-100/50 px-3 py-1.5 text-[10px] font-bold text-emerald-700 uppercase tracking-tight">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-sm text-slate-600 leading-relaxed italic">
                      <span className="block not-italic font-bold text-slate-900 text-xs uppercase tracking-widest mb-1">Strategic Why</span>
                      "{game.whyItWorks}"
                    </div>

                    <div className="text-sm text-slate-600 leading-relaxed">
                      <span className="block font-bold text-slate-900 text-xs uppercase tracking-widest mb-1">Implementation Effort</span>
                      {game.effort}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lead Capture</span>
                      <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{game.capture}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-[3rem] bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="rounded-2xl bg-emerald-600 p-3 shadow-lg shadow-emerald-200">
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">The Ideal Visitor Journey</h2>
            </div>
            <div className="space-y-5">
              {boothFlow.map((item, idx) => (
                <div key={item.title} className="group relative rounded-3xl bg-slate-50/50 border border-slate-200 p-6 transition-all hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5">
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 shrink-0 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-lg transition-all group-hover:bg-emerald-600 group-hover:scale-110 shadow-lg">
                      {idx + 1}
                    </div>
                    <div className="text-xl font-extrabold text-slate-900">{item.title}</div>
                  </div>
                  <div className="mt-4 ml-16 text-sm md:text-base text-slate-500 font-medium leading-relaxed group-hover:text-slate-600 transition-colors">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[3rem] bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:p-10 flex flex-col">
            <div className="flex items-center gap-4 mb-10">
              <div className="rounded-2xl bg-emerald-600 p-3 shadow-lg shadow-emerald-200">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Simplest Staffing Model</h2>
            </div>
            <div className="space-y-5">
              {staffing.map((item) => (
                <div key={item.role} className="group rounded-3xl bg-slate-50 border border-slate-200 p-6 transition-all hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5">
                  <div className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{item.role}</div>
                  <div className="text-sm md:text-base text-slate-500 font-medium leading-relaxed group-hover:text-slate-600 transition-colors">{item.text}</div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-10">
              <div className="rounded-[2rem] bg-amber-50 border border-amber-200 p-6 flex items-start gap-4">
                <div className="h-8 w-8 shrink-0 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-bold">!</div>
                <div className="space-y-1">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-amber-700">Practical rule</div>
                  <div className="text-sm md:text-base font-bold text-amber-900 leading-snug">
                    Keep roles simple. Avoid overstaffing the booth with too many overlapping responsibilities.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-[3rem] bg-slate-900 text-white shadow-2xl p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[120px] -ml-48 -mb-48" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="rounded-2xl bg-cyan-500 p-3 shadow-lg shadow-cyan-900/40">
                  <Trophy className="h-6 w-6 text-slate-950" />
                </div>
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight italic">Success Metrics</h2>
              </div>
              <div className="text-base text-slate-400 font-medium leading-relaxed mb-10 max-w-xl">
                Measures Dex should track to ensure the games are translating into actual commercial value.
              </div>
              <div className="grid gap-4">
                {successMetrics.map((item) => (
                  <div key={item.label} className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-cyan-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{item.label}</div>
                      <div className="h-2 w-2 rounded-full bg-cyan-500 group-hover:scale-150 transition-transform" />
                    </div>
                    <div className="text-sm text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative z-10 mt-10 p-6 rounded-[2rem] bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 shadow-xl">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">North Star Principle</div>
              <div className="text-base md:text-lg font-black leading-tight">
                Optimise for qualified conversations and booked next steps, not just raw booth traffic.
              </div>
            </div>
          </div>

          <div className="rounded-[3rem] bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white shadow-2xl p-8 lg:p-12 overflow-hidden relative border border-emerald-500/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.2),transparent_30%)]" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-10">
                <div className="rounded-2xl bg-white p-3 shadow-xl">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">Operating Model</h2>
              </div>

              <div className="rounded-[2.5rem] border border-white/20 bg-white/10 backdrop-blur-xl p-8 text-2xl md:text-3xl font-black leading-tight tracking-tight shadow-inner">
                2 Stations. <br />
                1 Target. <br />
                Total Visibility.
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mt-10">
                <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
                  <div className="text-xs uppercase tracking-[0.3em] font-black text-white/50 mb-5">Why it wins</div>
                  <ul className="space-y-4">
                    {["Handles hybrid traffic", "High energy, zero clutter", "Direct conversion path"].map((li) => (
                      <li key={li} className="flex items-center gap-3 text-sm font-bold">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                        {li}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="group rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
                  <div className="text-xs uppercase tracking-[0.3em] font-black text-white/50 mb-5">Action items</div>
                  <ul className="space-y-4">
                    {["Booth Script", "Game Copy", "Lead Fields", "Sync Station"].map((li) => (
                      <li key={li} className="flex items-center gap-3 text-sm font-bold">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                        {li}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto pt-10">
                <div className="group rounded-3xl bg-white/10 border border-white/15 p-6 backdrop-blur-md flex items-start gap-4 hover:bg-white/15 transition-all">
                  <CalendarCheck className="h-6 w-6 text-emerald-300 mt-1" />
                  <div className="text-sm md:text-base font-bold leading-relaxed text-white/90">
                    Deploy this model for internal alignment, booth planning, and single-slide reporting.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
