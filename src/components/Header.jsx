import React from 'react';

export default function Header({ page, setPage, onChaos }) {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (page !== 'home') {
      setPage('home');
      // Wait for DOM to render the home page before scrolling
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b-[3px] border-black bg-white px-5 py-3 sm:px-8">
      <a 
        href="#top" 
        onClick={handleLogoClick}
        className="text-sm font-black uppercase tracking-tight sm:text-base cursor-pointer"
      >
        DHRUV MAYUR VIRA
      </a>
      <nav className="flex items-center gap-2 sm:gap-3 font-mono">
        <a 
          href="#work" 
          onClick={(e) => handleNavClick(e, 'work')}
          className="hidden border-[3px] border-black px-3 py-1.5 text-xs font-black uppercase transition-colors hover:bg-black hover:text-white sm:block cursor-pointer"
        >
          WORK
        </a>
        <a 
          href="#think" 
          onClick={(e) => handleNavClick(e, 'think')}
          className="hidden border-[3px] border-black px-3 py-1.5 text-xs font-black uppercase transition-colors hover:bg-black hover:text-white sm:block cursor-pointer"
        >
          PHILOSOPHY
        </a>
        <a 
          href="#contact" 
          onClick={(e) => handleNavClick(e, 'contact')}
          className="hidden border-[3px] border-black px-3 py-1.5 text-xs font-black uppercase transition-colors hover:bg-black hover:text-white sm:block cursor-pointer"
        >
          CONTACT
        </a>
        
        <button
          onClick={onChaos}
          className="border-[3px] border-black px-3 py-1.5 text-xs font-black uppercase text-black cursor-pointer"
          style={{ background: "var(--accent)" }}
          title="Toggle Chaos Theme Color"
        >
          CHAOS ⚡
        </button>
      </nav>
    </header>
  );
}
