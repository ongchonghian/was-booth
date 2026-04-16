const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Find the block to replace
const startIndex = indexHtml.indexOf('games.map((game, index) =>');
const endIndex = indexHtml.indexOf('React.createElement(', indexHtml.indexOf('// ideal booth journey', startIndex) > -1 ? indexHtml.indexOf('// ideal booth journey', startIndex) : indexHtml.indexOf('className: "grid lg:grid-cols-2 gap-8"', startIndex));
// Actually, let's find the exact start and end strings.

const prefix = 'games.map((game, index) =>\n                  React.createElement(';
const suffix = '\n            ),\n\n            React.createElement(\n              "section",\n              { className: "grid lg:grid-cols-2 gap-8" },';

let startPos = indexHtml.indexOf('games.map((game, index) =>');
let endPos = indexHtml.indexOf('            React.createElement(\n              "section",\n              { className: "grid lg:grid-cols-2 gap-8" },', startPos);

if (startPos === -1 || endPos === -1) {
  console.error('Could not find the block in index.html');
  process.exit(1);
}

const replacement = `games.map((game, index) =>
                  React.createElement(
                    "div",
                    {
                      key: game.name,
                      className: "group/card perspective-[1000px] h-full cursor-pointer",
                      style: { perspective: "1000px" },
                      onClick: () => setSelectedGame(selectedGame === index ? null : index),
                    },
                    React.createElement(
                      "div",
                      {
                        className: "relative w-full h-full grid transition-transform duration-300 ease-out active:scale-[0.98]",
                        style: {
                          transformStyle: "preserve-3d",
                          transform: selectedGame === index ? "rotateY(180deg)" : "rotateY(0deg)",
                          transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                        }
                      },
                      // FRONT SIDE
                      React.createElement(
                        "div",
                        {
                          className: "flex flex-col rounded-[2.5rem] border border-slate-200 bg-slate-50/50 p-8 transition-all group-hover/card:bg-white group-hover/card:border-emerald-200 group-hover/card:shadow-2xl group-hover/card:shadow-emerald-500/10",
                          style: { gridArea: "1 / 1", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }
                        },
                        React.createElement(
                          "div",
                          { className: "flex items-start justify-between gap-4 mb-6 flex-wrap" },
                          React.createElement(
                            "div",
                            { className: "space-y-1" },
                            React.createElement(
                              "div",
                              { className: "text-xl font-black leading-tight tracking-tight text-slate-900 group-hover/card:text-emerald-700 transition-colors" },
                              game.name
                            ),
                            React.createElement(
                              "div",
                              { className: "flex items-center gap-2 text-xs text-slate-400 font-black uppercase tracking-widest" },
                              React.createElement(Timer, { className: "h-3.5 w-3.5" }),
                              game.time
                            )
                          ),
                          React.createElement(
                            "span",
                            { className: "shrink-0 rounded-xl bg-slate-900 text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-widest shadow-lg shadow-slate-200 mt-1" },
                            game.fit
                          )
                        ),
                        React.createElement(
                          "div",
                          { className: "text-sm text-slate-500 font-bold leading-relaxed mb-8 flex-grow" },
                          game.goal
                        ),
                        React.createElement(
                          "div",
                          { className: "mt-auto space-y-6" },
                          React.createElement(
                            "div",
                            { className: "space-y-4 pt-4 border-t border-slate-100" },
                            React.createElement(
                              "div",
                              { className: "text-xs text-slate-400 font-bold italic leading-relaxed" },
                              React.createElement(
                                "span",
                                { className: "block not-italic font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] mb-1" },
                                "Strategic Intent"
                              ),
                              '"' + game.whyItWorks + '"'
                            ),
                            React.createElement(
                              "div",
                              { className: "text-xs text-slate-500 font-bold leading-relaxed" },
                              React.createElement(
                                "span",
                                { className: "block font-black text-slate-900 text-[10px] uppercase tracking-[0.2em] mb-1" },
                                "Implementation Effort"
                              ),
                              game.effort
                            ),
                            React.createElement(
                              "div",
                              { className: "flex items-center justify-between pt-2" },
                              React.createElement(
                                "span",
                                { className: "text-[10px] font-black text-slate-300 uppercase tracking-widest" },
                                "Lead Capture"
                              ),
                              React.createElement(
                                "span",
                                { className: "text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full" },
                                game.capture
                              )
                            )
                          ),
                          React.createElement(
                            "div",
                            { className: "text-center pt-2 mt-2 border-t border-slate-100/50" },
                            React.createElement(
                              "span",
                              { className: "text-[10px] font-bold text-emerald-600 uppercase tracking-widest group-hover/card:underline" },
                              "Flip to view gameplay steps"
                            )
                          )
                        )
                      ),
                      // BACK SIDE
                      React.createElement(
                        "div",
                        {
                          className: "flex flex-col rounded-[2.5rem] border border-emerald-200 bg-white p-8 shadow-2xl shadow-emerald-500/10",
                          style: { gridArea: "1 / 1", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }
                        },
                        React.createElement(
                          "h4",
                          { className: "text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-2 pb-4 border-b border-slate-100" },
                          React.createElement(ArrowRight, { className: "h-4 w-4" }),
                          " Gameplay Steps"
                        ),
                        React.createElement(
                          "ol",
                          { className: "space-y-3 flex-grow" },
                          game.steps.map((step, stepIdx) =>
                            React.createElement(
                              "li",
                              {
                                key: stepIdx,
                                className: "text-sm font-medium text-slate-700 bg-slate-50/50 p-3 rounded-xl flex items-start gap-3 border border-slate-100"
                              },
                              React.createElement(CheckCircle2, { className: "h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" }),
                              React.createElement("span", null, step.replace(/^\d+\.\s*/, ''))
                            )
                          )
                        ),
                        React.createElement(
                          "div",
                          { className: "text-center pt-4 mt-6 border-t border-slate-100" },
                          React.createElement(
                            "span",
                            { className: "text-[10px] font-bold text-emerald-600 uppercase tracking-widest group-hover/card:underline" },
                            "Flip back to overview"
                          )
                        )
                      )
                    )
                  )
                )
`;

const newHtml = indexHtml.substring(0, startPos) + replacement + indexHtml.substring(endPos);

fs.writeFileSync('index.html', newHtml);
console.log('Successfully updated index.html');
