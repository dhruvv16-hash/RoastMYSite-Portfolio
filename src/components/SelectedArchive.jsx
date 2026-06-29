const projects = [
  {
    no: "01",
    name: "AI Email Writer",
    category: "Chrome Extension & Spring Boot",
    problem: "Composing professional emails in Gmail takes too much manual writing time.",
    move: "Inject a native button in Gmail UI using DOM observers, linked to Spring Boot & Gemini API.",
    outcome: "Context-aware, tone-customized responses generated in seconds inside the email compose box.",
    takeaway: "True AI utility lives directly inside the user's workflow, not in a separate dashboard."
  },
  {
    no: "02",
    name: "Movie Recommender",
    category: "Python & Machine Learning",
    problem: "Generic movie recommendations fail to match specific user-specified textual descriptions.",
    move: "Implement TF-IDF vectorization and cosine similarity on movie metadata in Streamlit.",
    outcome: "Highly tailored top-5 movie recommendations based on user text queries, processed in milliseconds.",
    takeaway: "Clean mathematical modeling often beats heavy deep learning for targeted semantic matching."
  },
  {
    no: "03",
    name: "Library Inventory",
    category: "C++ & File Persistence",
    problem: "Manual record-keeping of books in local libraries results in slow checkouts and lost items.",
    move: "Develop a structured C++ program using OOP principles and robust text file serialization.",
    outcome: "Manual database search time cut by approximately 60% with full persistence across restarts.",
    takeaway: "Solid object-oriented foundations build stable systems long before enterprise DBMS are needed."
  },
  {
    no: "04",
    name: "Password Evaluator",
    category: "Python & Regex Engine",
    problem: "Basic length checks miss common patterns, leaving user accounts vulnerable to dictionary attacks.",
    move: "Combine entropy calculations with specialized regex rules to measure structural password strength.",
    outcome: "Weak-credential detection accuracy increased by 40% over standard length-only checks.",
    takeaway: "Effective validation is about increasing cracking difficulty, not enforcing arbitrary rules."
  }
];

export default function SelectedArchive({ activeWorkIndex, setActiveWorkIndex }) {
  return (
    <section id="work" className="py-14 sm:py-20">
      <h2 className="mb-8 text-4xl font-black uppercase tracking-tighter sm:text-6xl">
        SELECTED WORK
      </h2>
      <div className="border-[3px] border-black" style={{ boxShadow: "8px 8px 0 #000" }}>
        {projects.map((project, index) => {
          const isOpen = activeWorkIndex === index;
          return (
            <div key={project.no} className={index > 0 ? "border-t-[3px] border-black" : ""}>
              <button
                onClick={() => setActiveWorkIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-black hover:text-white sm:p-6 cursor-pointer"
                style={isOpen ? { background: "var(--accent)", color: "#000" } : undefined}
              >
                <span className="flex items-baseline gap-4">
                  <span className="text-sm font-black">{project.no}</span>
                  <span className="text-2xl font-black uppercase leading-none sm:text-4xl">
                    {project.name}
                  </span>
                </span>
                <span className="shrink-0 text-2xl font-black">{isOpen ? "–" : "+"}</span>
              </button>
              
              {isOpen && (
                <div className="grid gap-4 border-t-[3px] border-black p-5 sm:grid-cols-3 sm:p-6 bg-white text-black font-mono">
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-widest text-black/50">PROBLEM</div>
                    <p className="mt-1 text-sm leading-snug">{project.problem}</p>
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-widest text-black/50">THE MOVE</div>
                    <p className="mt-1 text-sm leading-snug">{project.move}</p>
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-widest text-black/50">OUTCOME</div>
                    <p className="mt-1 text-sm leading-snug">{project.outcome}</p>
                  </div>
                  <p 
                    className="border-t-[3px] border-black pt-4 text-lg font-black uppercase leading-tight sm:col-span-3"
                    style={{ color: "var(--accent)", WebkitTextStroke: "0.4px #000" }}
                  >
                    ◆ {project.takeaway}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
