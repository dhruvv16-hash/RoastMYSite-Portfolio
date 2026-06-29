import { useState, useRef, useEffect } from 'react';
import { generateRoast, statusMessages } from '../utils/roastEngine';

export default function Roast({ setPage }) {
  const [state, setState] = useState("idle"); // idle, scanning, done
  const [url, setUrl] = useState("");
  const [logs, setLogs] = useState([]);
  const [roastResult, setRoastResult] = useState(null);
  const timers = useRef([]);

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    // Reset previous states
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLogs([]);
    setRoastResult(null);
    setState("scanning");

    const result = generateRoast(url);

    // Run simulated console printout
    statusMessages.forEach((msg, index) => {
      const timer = setTimeout(() => {
        const formattedMsg = msg.includes("dns")
          ? msg.replace("dns", `dns for ${result.domain}`)
          : msg;
        setLogs((prev) => [...prev, `> ${formattedMsg}`]);
      }, 220 * (index + 1));
      timers.current.push(timer);
    });

    // Complete scan
    const completeTimer = setTimeout(() => {
      setRoastResult(result);
      setState("done");
    }, 220 * (statusMessages.length + 1) + 350);
    timers.current.push(completeTimer);
  };

  const handleReset = () => {
    timers.current.forEach(clearTimeout);
    setState("idle");
    setRoastResult(null);
    setLogs([]);
    setUrl("");
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-16 font-mono text-black bg-white min-h-screen">
      {/* Roast Page Header Nav */}
      <div className="flex items-center justify-between border-b-[3px] border-black pb-3 text-[11px] font-bold uppercase tracking-[0.2em] sm:text-xs">
        <span>DHRUV MAYUR VIRA // SITE-ROAST v1.0</span>
        <button
          onClick={() => {
            setPage('home');
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          className="underline decoration-2 underline-offset-4 hover:bg-black hover:text-white cursor-pointer bg-transparent border-none p-0 uppercase"
        >
          ← portfolio
        </button>
      </div>

      {/* Main Title Section */}
      <header className="relative mt-10 sm:mt-14">
        <span 
          className="absolute -right-1 top-0 rotate-6 border-[3px] border-black px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white sm:text-xs animate-bounce"
          style={{ background: "var(--accent)", color: "#000", boxShadow: "5px 5px 0 #000" }}
        >
          brutal honesty
        </span>
        <h1 className="text-[16vw] font-black uppercase leading-[0.82] tracking-tighter sm:text-8xl">
          Roast<br />My Site
        </h1>
        <p className="mt-6 max-w-xl border-l-[6px] border-black pl-4 text-sm leading-relaxed sm:text-base text-black/80">
          Paste a URL. Get it taken apart, line by line. Then — if you can take a hint — get it rebuilt by someone who won't let it happen again.
        </p>
      </header>

      {/* Form State */}
      {state === "idle" && (
        <form onSubmit={handleSubmit} className="mt-10">
          <label className="block text-xs font-bold uppercase tracking-[0.2em]">Drop the URL ↓</label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="competitor-i-dont-like.com"
              autoComplete="off"
              spellCheck="false"
              className="w-full border-[3px] border-black bg-white px-4 py-4 text-base font-bold lowercase placeholder:text-black/30 focus:outline-none focus:ring-0"
              style={{ boxShadow: "6px 6px 0 #000" }}
            />
            <button
              type="submit"
              className="shrink-0 border-[3px] border-black px-7 py-4 text-base font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
              style={{ background: "#000", boxShadow: "6px 6px 0 var(--accent)" }}
            >
              Roast it →
            </button>
          </div>
          <p className="mt-3 text-[11px] uppercase tracking-wider text-black/45">
            Satire. It doesn't crawl your real site — the fixes, however, are real.
          </p>
        </form>
      )}

      {/* Scanning State */}
      {state === "scanning" && (
        <div 
          className="mt-10 border-[3px] border-black bg-black p-5 text-sm text-white sm:p-6"
          style={{ boxShadow: "8px 8px 0 var(--accent)" }}
        >
          {/* Virtual Terminal Lights */}
          <div className="mb-3 flex gap-2">
            <span className="h-3 w-3 border-2 border-white"></span>
            <span className="h-3 w-3 border-2 border-white"></span>
            <span className="h-3 w-3 border-2 border-white"></span>
          </div>
          {logs.map((log, index) => (
            <div key={index} className="whitespace-pre-wrap leading-relaxed">
              {log}
            </div>
          ))}
          <span className="inline-block h-4 w-3 animate-pulse bg-white align-middle"></span>
        </div>
      )}

      {/* Completed Results State */}
      {state === "done" && roastResult && (
        <section className="mt-10">
          <h2 className="text-2xl font-black uppercase leading-tight sm:text-4xl">
            We looked at <span className="text-black px-2 py-0.5" style={{ background: "var(--accent)" }}>{roastResult.domain}</span>.
            <br className="hidden sm:block" /> We have notes.
          </h2>

          {/* Scores Overview Row */}
          <div className="mt-8 grid gap-4 sm:grid-cols-[auto_1fr]">
            <div 
              className="border-[3px] border-black bg-white px-6 py-5 text-center"
              style={{ boxShadow: "8px 8px 0 #000" }}
            >
              <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-black/60">Roast score</div>
              <div className="text-7xl font-black leading-none sm:text-8xl">{roastResult.score}</div>
              <div className="text-sm font-bold">/ 100</div>
            </div>

            <div 
              className="flex flex-col justify-center border-[3px] border-black p-6 text-white bg-black"
              style={{ boxShadow: "8px 8px 0 var(--accent)" }}
            >
              <div className="text-3xl font-black uppercase leading-none sm:text-5xl" style={{ color: "var(--accent)" }}>
                {roastResult.grade}
              </div>
              <div className="mt-3 text-sm uppercase tracking-wide opacity-80">
                {roastResult.gradeNote}
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {roastResult.categories.map((cat) => (
              <div 
                key={cat.key} 
                className="border-[3px] border-black p-5 bg-white"
                style={{ boxShadow: "6px 6px 0 #000" }}
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-black/60">{cat.label}</span>
                  <span className="text-xl font-black">{cat.score}</span>
                </div>
                
                {/* Visual Progress Bar */}
                <div className="mt-2 h-4 w-full border-2 border-black bg-white">
                  <div 
                    className="h-full transition-all duration-500"
                    style={{ 
                      width: `${cat.score}%`, 
                      background: cat.score < 50 ? "var(--accent)" : "#000" 
                    }}
                  />
                </div>
                <p className="mt-3 text-sm leading-snug text-black/80 font-mono">
                  {cat.line}
                </p>
              </div>
            ))}
          </div>

          {/* Verdict Banner */}
          <div 
            className="mt-6 border-[3px] border-black p-6 text-black bg-black"
            style={{ background: "var(--accent)", color: "#000", boxShadow: "8px 8px 0 #000" }}
          >
            <div className="text-xs font-black uppercase tracking-[0.25em] text-black/60">Final verdict</div>
            <p className="mt-2 text-lg font-bold leading-snug text-black sm:text-2xl">
              {roastResult.verdict}
            </p>
          </div>

          {/* Fix Pitch Banner */}
          <div 
            className="mt-6 border-[3px] border-black p-6 bg-white"
            style={{ boxShadow: "8px 8px 0 #000" }}
          >
            <p className="text-xl font-black uppercase leading-tight sm:text-3xl">
              Brutal? Yes. Fixable? Also yes.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-black/70 font-mono">
              Roasts are free. Fixes aren't — but a backend that actually scale pays for itself. I build APIs, databases and automated pipelines that don't crash under pressure.
            </p>
            
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:dhruvvira17@gmail.com?subject=Fix%20my%20site%20—%20you%20roasted%20${roastResult.domain}`}
                className="border-[3px] border-black px-6 py-4 text-center text-base font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] cursor-pointer"
                style={{ background: "#000", boxShadow: "6px 6px 0 var(--accent)" }}
              >
                → Get it fixed
              </a>
              <button
                onClick={() => {
                  setPage('home');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="border-[3px] border-black bg-white px-6 py-4 text-center text-base font-black uppercase tracking-wider text-black transition-colors hover:bg-black hover:text-white cursor-pointer"
              >
                See the work
              </button>
            </div>
          </div>

          {/* Reset / Roast Another Button */}
          <button
            onClick={handleReset}
            className="mt-6 w-full border-[3px] border-black bg-white py-4 text-base font-black uppercase tracking-widest transition-colors hover:bg-black hover:text-white cursor-pointer"
          >
            ↻ Roast another
          </button>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t-[3px] border-black pt-3 text-[11px] uppercase tracking-[0.2em] text-black/50">
        DHRUV MAYUR VIRA — site-roast · all in good fun
      </footer>
    </div>
  );
}
