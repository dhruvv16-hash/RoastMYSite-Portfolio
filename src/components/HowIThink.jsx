const thoughts = [
  {
    key: "care",
    big: "I DESIGN FOR HORIZONS, NOT JUST DEMOS.",
    small: "My systems run just as cleanly under sudden high concurrency as they do in a local development preview. Scale is built-in."
  },
  {
    key: "feel",
    big: "I OBSESS OVER LATENCY, NOT JUST BEAUTY.",
    small: "A gorgeous page that queries a database poorly is still a broken experience. Real performance is a core design token."
  },
  {
    key: "memorable",
    big: "I CHOOSE RELIABILITY OVER SYSTEM HYPOCRITICS.",
    small: "Dependencies age like milk. A clean, modular architecture in Spring Boot, Python, or C++ remains maintainable for years."
  },
  {
    key: "partner",
    big: "I ANALYZE REQUIREMENTS, NOT JUST TICKETS.",
    small: "I ask why we are collecting this specific data — and I will suggest a faster, lighter architectural path if one exists."
  }
];

export default function HowIThink() {
  return (
    <section id="think" className="pb-14 sm:pb-20">
      <h2 className="mb-8 text-4xl font-black uppercase tracking-tighter sm:text-6xl">
        HOW I THINK
      </h2>
      <div className="space-y-5">
        {thoughts.map((thought, index) => {
          const isDark = index % 2 === 1;
          return (
            <div
              key={thought.key}
              className="border-[3px] border-black p-6 sm:p-8"
              style={{
                boxShadow: "8px 8px 0 #000",
                background: isDark ? "#000" : "#fff",
                color: isDark ? "#fff" : "#000"
              }}
            >
              <div 
                className="text-xs font-black uppercase tracking-[0.3em]"
                style={{ color: "var(--accent)" }}
              >
                0{index + 1}
              </div>
              <p className="mt-2 text-2xl font-black uppercase leading-tight sm:text-4xl">
                {thought.big}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-70 font-mono">
                {thought.small}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
