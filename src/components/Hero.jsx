import ScrambledText from './ScrambledText';

export default function Hero({ setPage }) {
  const handleStartProject = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#contact');
    }
  };

  return (
    <section id="top" className="relative pt-14 sm:pt-20">
      {/* Blinking Badge */}
      <span 
        className="inline-flex items-center gap-2 border-[3px] border-black px-3 py-1.5 text-xs font-black uppercase tracking-widest"
        style={{ background: "var(--accent)" }}
      >
        <span className="h-2.5 w-2.5 bg-black v2-blink"></span>
        Available for backend roles & projects
      </span>
      
      {/* Heavy Brutalist Header */}
      <h1 className="mt-6 text-[15vw] font-black uppercase leading-[0.82] tracking-tighter sm:text-[7rem]">
        <ScrambledText text="I BUILD" />
        <br />
        <ScrambledText 
          text="DIGITAL" 
          className="text-stroke-black text-transparent"
        />
        <br />
        <ScrambledText text="PRODUCTS." />
      </h1>
      
      {/* Monospaced description */}
      <p className="mt-7 max-w-xl border-l-[6px] border-black pl-4 text-base leading-relaxed sm:text-lg font-mono text-black/80">
        Backend engineer & CS undergraduate. I help teams design REST APIs, optimize database performance, and build AI-integrated systems that are clear, fast, and genuinely robust.
      </p>
      
      {/* Hero Action CTAs */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row font-mono">
        <a 
          href="#contact"
          onClick={handleStartProject}
          className="border-[3px] border-black bg-black px-7 py-4 text-center text-base font-black uppercase tracking-wider text-white transition-transform hover:-translate-x-1 hover:-translate-y-1 cursor-pointer"
          style={{ boxShadow: "6px 6px 0 var(--accent)" }}
        >
          START A PROJECT →
        </a>
        <button 
          onClick={() => {
            setPage('roast');
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          className="border-[3px] border-black bg-white px-7 py-4 text-center text-base font-black uppercase tracking-wider text-black transition-colors hover:bg-black hover:text-white cursor-pointer"
        >
          ROAST MY SITE 🔥
        </button>
      </div>
    </section>
  );
}
