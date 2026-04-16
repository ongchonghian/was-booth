import re

with open('index.html', 'r') as f:
    text = f.read()

# I will write a nice JSX-based index.html.
new_html = """<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WAS Booth Infographic</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const createLucideIcon = (iconData) => {
        return (props) => {
          const [tagName, attrs, children] = iconData;
          return React.createElement(
            tagName,
            {
              ...attrs,
              ...props,
              className: `${attrs.class || ""} ${props.className || ""}`.trim(),
            },
            children.map(([childTagName, childAttrs], idx) =>
              React.createElement(childTagName, { ...childAttrs, key: idx }),
            ),
          );
        };
      };

      const {
        Fish: FishData, Trophy: TrophyData, ClipboardList: ClipboardListData,
        Gauge: GaugeData, WifiOff: WifiOffData, ScanLine: ScanLineData,
        Users: UsersData, Target: TargetData, ArrowRight: ArrowRightData,
        CheckCircle2: CheckCircle2Data, Timer: TimerData, MessageSquare: MessageSquareData,
        CalendarCheck: CalendarCheckData, Sparkles: SparklesData,
      } = window.lucide;

      const Fish = createLucideIcon(FishData);
      const Trophy = createLucideIcon(TrophyData);
      const ClipboardList = createLucideIcon(ClipboardListData);
      const Gauge = createLucideIcon(GaugeData);
      const WifiOff = createLucideIcon(WifiOffData);
      const ScanLine = createLucideIcon(ScanLineData);
      const Users = createLucideIcon(UsersData);
      const Target = createLucideIcon(TargetData);
      const ArrowRight = createLucideIcon(ArrowRightData);
      const CheckCircle2 = createLucideIcon(CheckCircle2Data);
      const Timer = createLucideIcon(TimerData);
      const MessageSquare = createLucideIcon(MessageSquareData);
      const CalendarCheck = createLucideIcon(CalendarCheckData);
      const Sparkles = createLucideIcon(SparklesData);

      // --- DATA MODELS ---
      const pillars = [
        { icon: ClipboardList, title: "Faster farm recording", text: "Show how daily records can be quicker, cleaner, and easier to capture." },
        { icon: Fish, title: "End-to-end traceability", text: "Show how batches, locations, and farm events stay linked over time." },
        { icon: Gauge, title: "Clearer farm insight", text: "Show how better records support better visibility and decisions." },
        { icon: WifiOff, title: "Built for field conditions", text: "Show that work can continue even when connectivity is unreliable." },
      ];

      const games = [
        {
          name: "Daily Log Quest", time: "1–2 min", fit: "Best for quick engagement",
          goal: "Gamify daily log completion by turning routine actions into a multi-tier streak ladder.",
          teaches: ["daily habits", "log completion", "farm routine"],
          whyItWorks: "Uses existing metrics to provide instant, loud animated feedback without backend changes.",
          capture: "QR for app trial + streak challenge",
          effort: "Low: Reuses existing 'todayLogCount' from HomeViewModel. Just needs the new UI Overlay + Lottie animations.",
          steps: ["1. Open app to see 'Today's Streak: 0/3 Logs'", "2. Complete normal 'Feed Fish' workflow", "3. Hit Submit. App returns to Home Screen", "4. Progress bar fills to 1/3. A gold star bounces onto screen ('First Log!')", "5. Complete 2 more logs to trigger full confetti 'Streak Master!' animation"]
        },
        {
          name: "Ops Bingo", time: "2–3 min", fit: "Best for exploring features",
          goal: "Encourage workers to explore different log types (Feed, Grade, Sample) to fill a Bingo card.",
          teaches: ["feature discovery", "workflow variety", "comprehensive logging"],
          whyItWorks: "Drives horizontal adoption using chunky, tactile UI tiles and confetti rewards.",
          capture: "QR for full feature list + demo",
          effort: "Medium: Requires a new bottom sheet UI and querying 6 existing local DAOs to determine tile states.",
          steps: ["1. Open 'Ops Bingo' sheet from Home Screen", "2. Notice 'Dead Fish' tile is unlit (0 logged today)'", "3. Find a mortality in pen, log it via 'Dead Fish' button", "4. Return to Home. 'Dead Fish' tile illuminates Teal", "5. If a row of 3 lights up, 'Line Completed!' toast appears", "6. Light all 6 for a massive screen-filling confetti drop"]
        },
        {
          name: "Sync Clean Badge", time: "1 min", fit: "Best trust builder",
          goal: "Gamify offline-first hygiene by rewarding workers when they clear all pending records.",
          teaches: ["offline logging", "sync habits", "field reliability"],
          whyItWorks: "Turns a mundane data sync action into a satisfying, badge-earning moment.",
          capture: "Badge or QR at sync station",
          effort: "Low: Hooks directly into existing CacheSyncManager completion callbacks. Minor UI overlay work.",
          steps: ["1. Log offline all morning (e.g., 'Pending Records: 12')", "2. Return to office Wi-Fi, perform pull-to-refresh on Home Screen", "3. CacheSyncManager successfully pushes all 12 records", "4. Subtle 'pop' sound plays", "5. Background dims, bright 'Sync Clean!' badge animates into center", "6. Home updates to 'Pending Records: 0'"]
        },
        {
          name: "Sampling Micro-Quiz", time: "1–2 min", fit: "Best for deeper conversations",
          goal: "Reinforce biological concepts with a quick 5-second educational popup after a workflow.",
          teaches: ["SGR/FCR concepts", "data validation", "fish growth"],
          whyItWorks: "Contextual learning tied directly to the data just entered, making it highly relevant.",
          capture: "Persona-tagged lead capture",
          effort: "Medium: Requires intercepting the existing ReviewSubmitStep with a new conditional sliding card UI.",
          steps: ["1. Perform Sampling workflow (weigh/measure fish)", "2. Enter data (e.g., 500g, 'Grower' feed) and tap Submit", "3. App intercepts success screen randomly (~20% of time)", "4. High-contrast card slides up with quiz question based on inputs", "5. Answer correctly: Mini-celebration right on card", "6. Answer incorrectly: Gentle hint appears before proceeding to success screen"]
        },
      ];

      const boothFlow = [
        { title: "1. Attract", text: "Lead with a simple hook: play a farm workflow game in under 3 minutes." },
        { title: "2. Engage", text: "Run one short activity tied to a real farm task." },
        { title: "3. Explain", text: "Turn the game result into a simple product takeaway in 30 seconds." },
        { title: "4. Convert", text: "Capture the lead, tag their interest, and move qualified visitors to the next step." },
      ];

      const staffing = [
        { role: "Greeter", text: "Stops traffic with a simple hook, not a long pitch." },
        { role: "Game Coach", text: "Runs the activity and keeps the pace high." },
        { role: "Closer", text: "Links the game to value, qualifies the lead, and secures follow-up." },
      ];

      const successMetrics = [
        { label: "Visitors who stop", detail: "Is the booth message strong enough to interrupt foot traffic?" },
        { label: "Visitors who play", detail: "Is the activity attractive enough to convert attention into engagement?" },
        { label: "Leads captured", detail: "Are we producing useful contacts for follow-up?" },
        { label: "Meetings booked", detail: "Are the games generating qualified conversations?" },
        { label: "Most requested workflows", detail: "Which topics resonate most, such as feeding, offline use, or traceability?" },
        { label: "Lead quality by visitor type", detail: "Are we attracting farmers, partners, regulators, or researchers?" },
      ];

      const remember = [
        "SGFarmApp supports real farm work, not just office reporting.",
        "Daily records such as feeding, harvest, mortality, grading, and sampling can be faster and more consistent.",
        "Offline-ready workflows matter in real farm operations.",
        "Better records create better traceability and better insight.",
      ];

      // --- COMPONENTS ---

      const Hero = () => (
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_24%)]"></div>
          <div className="relative grid lg:grid-cols-[1.35fr_0.75fr] gap-8 p-8 md:p-12">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.24em] text-white/80 font-bold">
                <Sparkles className="h-4 w-4" /> Dex × SGFarmApp × WAS
              </div>
              <div className="col-span-1 md:col-span-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-lg mt-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-black mb-2 tracking-tight">Live Booth Leaderboard</h2>
                    <p className="text-emerald-50 text-sm leading-relaxed max-w-2xl font-medium">A TV screen shows live scores, game activity, and recent wins to attract attention and keep visitors engaged.</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-block bg-white text-teal-700 font-black px-6 py-3 rounded-xl text-sm uppercase tracking-widest shadow-sm">Live on Booth TV</span>
                  </div>
                </div>
              </div>
              <h1 className="mt-6 text-3xl md:text-5xl font-black leading-tight max-w-4xl tracking-tight">Turn booth curiosity into clear product value.</h1>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-white/90 max-w-3xl font-medium">Use short, hands-on games to show how SGFarmApp helps aquaculture teams capture data faster, preserve traceability, and work with clearer farm insight.</p>
              <div className="mt-10 flex flex-wrap gap-3">
                {["hands-on games", "farm-first workflows", "clear product value", "qualified leads"].map(item => (
                  <span key={item} className="rounded-full border border-white/25 bg-white/15 px-5 py-2.5 text-sm font-bold shadow-lg backdrop-blur-sm transition-all hover:bg-white/25 cursor-default hover:scale-105">{item}</span>
                ))}
              </div>
            </div>
            <div className="rounded-[2.5rem] bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-3xl self-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <div className="text-xs uppercase tracking-[0.25em] font-black text-white/70">The desired outcome</div>
              </div>
              <div className="text-2xl md:text-3xl font-black leading-tight tracking-tight">Help visitors understand SGFarmApp in under 5 minutes.</div>
              <div className="mt-8 space-y-3">
                {["More memorable than a static pitch", "More engaging than a passive screen demo", "Designed to create follow-up conversations"].map(point => (
                  <div key={point} className="flex items-center gap-3 rounded-2xl bg-white/5 py-4 px-6 border border-white/5 hover:bg-white/10 transition-all cursor-default">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
                    <span className="text-sm font-bold text-white/90">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );

      const Pillars = ({ items }) => (
        <div className="group rounded-[2.5rem] bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:p-10 transition-all hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] flex flex-col">
          <div className="flex items-center gap-4 mb-10">
            <div className="rounded-2xl bg-emerald-600 p-3 shadow-lg shadow-emerald-200"><Target className="h-6 w-6 text-white" /></div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">What the booth must communicate</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 flex-grow">
            {items.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group/card rounded-3xl bg-slate-50 border border-slate-200 p-6 transition-all hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 cursor-default flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-2xl bg-emerald-100 text-emerald-700 p-3 transition-colors group-hover/card:bg-emerald-600 group-hover/card:text-white"><Icon className="h-5 w-5" /></div>
                    <div className="text-lg font-black leading-tight group-hover/card:text-emerald-900 transition-colors">{item.title}</div>
                  </div>
                  <div className="text-sm text-slate-500 font-medium leading-relaxed group-hover/card:text-slate-600 transition-colors">{item.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      );

      const Remember = ({ items }) => (
        <div className="rounded-[2.5rem] bg-slate-900 text-white shadow-2xl p-8 lg:p-10 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] -mr-32 -mt-32"></div>
          <div className="relative z-10 flex flex-col flex-grow">
            <div className="flex items-center gap-4 mb-10">
              <div className="rounded-2xl bg-cyan-500 p-3 shadow-lg shadow-cyan-900/40"><MessageSquare className="h-6 w-6 text-slate-950" /></div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">What visitors should remember</h2>
            </div>
            <div className="space-y-4 mb-10">
              {items.map(item => (
                <div key={item} className="group/item rounded-3xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-cyan-500/30 flex items-start gap-4">
                  <div className="h-6 w-6 shrink-0 mt-0.5 rounded-full border border-cyan-500/50 flex items-center justify-center text-[10px] font-black text-cyan-400 opacity-60 group-hover/item:opacity-100 transition-opacity">✓</div>
                  <div className="text-sm md:text-base font-bold leading-relaxed text-slate-300 group-hover/item:text-white transition-colors">{item}</div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-6">
              <div className="rounded-[2rem] bg-cyan-400 text-slate-950 p-7 shadow-xl shadow-cyan-950/20">
                <div className="text-xs font-black uppercase tracking-[0.25em] opacity-40 mb-2">Key takeaway</div>
                <div className="text-base md:text-xl font-black leading-snug">The games are the hook. Their real job is to make the app’s value obvious, fast.</div>
              </div>
            </div>
          </div>
        </div>
      );

      const GameCard = ({ game, isSelected, onClick }) => (
        <div className="group/card perspective-[1000px] h-full cursor-pointer" onClick={onClick}>
          <div className={`relative w-full h-full grid transition-transform duration-300 ease-out active:scale-[0.98] ${isSelected ? '[transform:rotateY(180deg)] group-hover/card:[transform:rotateY(168deg)]' : '[transform:rotateY(0deg)] group-hover/card:[transform:rotateY(12deg)]'}`} style={{ transformStyle: 'preserve-3d' }}>
            <div className="flex flex-col rounded-[2.5rem] border border-slate-200 bg-slate-50/50 p-8 transition-all group-hover/card:bg-white group-hover/card:border-emerald-200 group-hover/card:shadow-2xl group-hover/card:shadow-emerald-500/10" style={{ gridArea: '1 / 1', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
              <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                <div className="space-y-1">
                  <div className="text-xl font-black leading-tight tracking-tight text-slate-900 group-hover/card:text-emerald-700 transition-colors">{game.name}</div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-black uppercase tracking-widest"><Timer className="h-3.5 w-3.5" />{game.time}</div>
                </div>
                <span className="shrink-0 rounded-xl bg-slate-900 text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-widest shadow-lg shadow-slate-200 mt-1">{game.fit}</span>
              </div>
              <div className="text-sm text-slate-500 font-bold leading-relaxed mb-8 flex-grow">{game.goal}</div>
              <div className="mt-auto space-y-6">
                <div className="rounded-3xl bg-white/80 border border-slate-200 p-5 shadow-sm">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-extrabold mb-4">What visitors learn</div>
                  <div className="flex flex-wrap gap-2">
                    {game.teaches.map(item => <span key={item} className="rounded-lg bg-emerald-50 border border-emerald-100/50 px-3 py-1.5 text-[10px] font-bold text-emerald-700 uppercase tracking-tight">{item}</span>)}
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-400 font-bold italic leading-relaxed"><span className="block not-italic font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] mb-1">Strategic Intent</span>"{game.whyItWorks}"</div>
                  <div className="text-xs text-slate-500 font-bold leading-relaxed"><span className="block font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] mb-1">Implementation Effort</span>{game.effort}</div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Lead Capture</span>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">{game.capture}</span>
                  </div>
                </div>
                <div className="text-center pt-2 mt-2 border-t border-slate-100/50">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest group-hover/card:underline">Flip to view gameplay steps</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-[2.5rem] border border-emerald-200 bg-white p-8 shadow-2xl shadow-emerald-500/10" style={{ gridArea: '1 / 1', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <h4 className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2 pb-4 border-b border-slate-100"><ArrowRight className="h-4 w-4" /> Gameplay Steps</h4>
              <ol className="space-y-3 flex-grow">
                {game.steps.map((step, idx) => (
                  <li key={idx} className="text-sm font-medium text-slate-700 bg-slate-50/50 p-3 rounded-xl flex items-start gap-3 border border-slate-100">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{step.replace(/^\d+\.\s*/, '')}</span>
                  </li>
                ))}
              </ol>
              <div className="text-center pt-4 mt-6 border-t border-slate-100">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest group-hover/card:underline">Flip back to overview</span>
              </div>
            </div>
          </div>
        </div>
      );

      const GamesList = ({ games }) => {
        const [selectedGame, setSelectedGame] = React.useState(null);
        return (
          <section className="rounded-[3rem] bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-1.5 w-10 rounded-full bg-emerald-600"></div>
                  <div className="text-sm uppercase tracking-[0.3em] text-emerald-700 font-black">Experience Layer</div>
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">Recommended Mini-Games</h2>
              </div>
              <div className="rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 px-8 py-4 text-sm font-black shadow-sm">4 complementary booth activities</div>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {games.map((game, index) => (
                <GameCard key={game.name} game={game} isSelected={selectedGame === index} onClick={() => setSelectedGame(selectedGame === index ? null : index)} />
              ))}
            </div>
          </section>
        );
      };

      const BoothJourney = ({ items }) => (
        <div className="rounded-[3rem] bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:p-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="rounded-2xl bg-emerald-600 p-3 shadow-lg shadow-emerald-200 text-white"><ArrowRight className="h-6 w-6" /></div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Ideal booth journey</h2>
          </div>
          <div className="space-y-5">
            {items.map((item, idx) => (
              <div key={item.title} className="group/item relative rounded-3xl bg-slate-50 border border-slate-200 p-6 transition-all hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 shrink-0 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xl transition-all group-hover/item:bg-emerald-600 group-hover/item:scale-110 shadow-xl">{idx + 1}</div>
                  <div className="text-xl font-black text-slate-900">{item.title}</div>
                </div>
                <div className="mt-4 ml-20 text-sm md:text-base text-slate-500 font-bold leading-relaxed group-hover/item:text-slate-600 transition-colors">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      );

      const Staffing = ({ items }) => (
        <div className="rounded-[3rem] bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:p-10 flex flex-col">
          <div className="flex items-center gap-4 mb-12">
            <div className="rounded-2xl bg-emerald-600 p-4 shadow-lg shadow-emerald-200 text-white"><Users className="h-6 w-6" /></div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Recommended booth roles</h2>
          </div>
          <div className="space-y-5 flex-grow">
            {items.map(item => (
              <div key={item.role} className="group/item rounded-3xl bg-slate-50 border border-slate-200 p-7 transition-all hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5">
                <div className="text-xl font-black text-slate-900 mb-2 group-hover/item:text-emerald-700 transition-colors">{item.role}</div>
                <div className="text-sm md:text-base text-slate-500 font-bold leading-relaxed group-hover/item:text-slate-600 transition-colors">{item.text}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-10 border-t border-slate-100">
            <div className="rounded-[2rem] bg-amber-50 border border-amber-200 p-7 flex items-start gap-5 shadow-sm shadow-amber-100">
              <div className="h-10 w-10 shrink-0 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-black text-xl">!</div>
              <div className="space-y-1">
                <div className="text-xs font-black uppercase tracking-[0.3em] text-amber-700 opacity-60">Practical rule</div>
                <div className="text-base font-black text-amber-950 leading-snug">Keep responsibilities clear. Too many overlapping roles will slow the booth down.</div>
              </div>
            </div>
          </div>
        </div>
      );

      const Metrics = ({ items }) => (
        <div className="rounded-[3.5rem] bg-slate-900 text-white shadow-2xl p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[120px] -ml-48 -mb-48"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-5 mb-10">
              <div className="rounded-2xl bg-cyan-500 p-4 shadow-xl shadow-cyan-900/40 text-slate-950"><Trophy className="h-7 w-7" /></div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight italic">How we will know the booth worked</h2>
            </div>
            <div className="text-base text-slate-400 font-bold leading-relaxed mb-12 max-w-xl">These are the measures Dex should track to see whether booth activity is creating real commercial value.</div>
            <div className="grid gap-4 mb-12">
              {items.map(item => (
                <div key={item.label} className="group/item rounded-[2rem] border border-white/10 bg-white/5 p-7 transition-all hover:bg-white/10 hover:border-cyan-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-lg font-black text-white group-hover/item:text-cyan-400 transition-colors tracking-tight uppercase">{item.label}</div>
                    <div className="h-2 w-2 rounded-full bg-cyan-500 group-hover/item:scale-150 transition-transform shadow-[0_0_10px_#22d3ee]"></div>
                  </div>
                  <div className="text-sm text-slate-400 font-bold leading-relaxed group-hover/item:text-slate-200 transition-colors">{item.detail}</div>
                </div>
              ))}
            </div>
            <div className="mt-auto rounded-[2rem] bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 p-8 shadow-2xl flex items-center justify-between">
              <div className="text-lg md:text-2xl font-black leading-tight max-w-sm">Optimise for qualified conversations and booked next steps, not just foot traffic.</div>
              <div className="h-14 w-14 shrink-0 rounded-full bg-slate-950/20 flex items-center justify-center font-black text-2xl transition-transform hover:translate-x-2">→</div>
            </div>
          </div>
        </div>
      );

      const BoothSetup = () => (
        <div className="rounded-[3.5rem] bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white shadow-2xl p-8 lg:p-12 overflow-hidden relative border border-emerald-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,213,238,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.2),transparent_30%)]"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-5 mb-10">
              <div className="rounded-2xl bg-white p-4 shadow-xl text-emerald-600"><CheckCircle2 className="h-7 w-7" /></div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Recommended booth setup</h2>
            </div>
            <div className="rounded-[2.5rem] border border-white/20 bg-white/10 backdrop-blur-2xl p-10 text-3xl md:text-4xl font-black leading-none tracking-tighter shadow-2xl text-center">
              2 live stations. 1 simple goal.<br /><span className="text-cyan-300">Clear product value.</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mt-12">
              <div className="group/item rounded-3xl border border-white/10 bg-white/5 p-7 hover:bg-white/10 transition-all">
                <div className="text-xs font-black uppercase tracking-[0.4em] text-white/40 mb-6">Why this works</div>
                <ul className="space-y-5">
                  {["Supports quick traffic and deeper conversations", "Keeps the booth active without feeling cluttered", "Creates a clear path from engagement to conversion"].map(li => (
                    <li key={li} className="flex items-center gap-4 text-sm font-black"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"></span>{li}</li>
                  ))}
                </ul>
              </div>
              <div className="group/item rounded-3xl border border-white/10 bg-white/5 p-7 hover:bg-white/10 transition-all">
                <div className="text-xs font-black uppercase tracking-[0.4em] text-white/40 mb-6">Useful next assets</div>
                <ul className="space-y-5">
                  {["booth script", "game station copy", "lead capture fields", "post-event follow-up flow"].map(li => (
                    <li key={li} className="flex items-center gap-4 text-sm font-black"><span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"></span>{li}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-auto pt-12">
              <div className="group/item rounded-[2.5rem] bg-white/10 border border-white/20 p-8 backdrop-blur-xl flex items-start gap-6 hover:bg-white/20 transition-all shadow-xl">
                <CalendarCheck className="h-8 w-8 text-emerald-300 shrink-0" />
                <div className="text-sm md:text-lg font-bold leading-relaxed text-white/95">Best use of this infographic: internal alignment, booth planning, and single-slide event briefing.</div>
              </div>
            </div>
          </div>
        </div>
      );

      const WasSgFarmAppBoothInfographic = () => (
        <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
          <div className="max-w-7xl mx-auto p-6 lg:p-12 space-y-12">
            <Hero />
            <section className="grid lg:grid-cols-2 gap-8">
              <Pillars items={pillars} />
              <Remember items={remember} />
            </section>
            <GamesList games={games} />
            <section className="grid lg:grid-cols-2 gap-8">
              <BoothJourney items={boothFlow} />
              <Staffing items={staffing} />
            </section>
            <section className="grid lg:grid-cols-2 gap-8">
              <Metrics items={successMetrics} />
              <BoothSetup />
            </section>
          </div>
        </div>
      );

      ReactDOM.createRoot(document.getElementById("root")).render(<WasSgFarmAppBoothInfographic />);
    </script>
  </body>
</html>
"""

with open('index.html', 'w') as f:
    f.write(new_html)

