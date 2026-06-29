import { useState } from 'react';
import Hero from '../components/Hero';
import ElevatorPitch from '../components/ElevatorPitch';
import Marquee from '../components/Marquee';
import WhatIBuild from '../components/WhatIBuild';
import SelectedArchive from '../components/SelectedArchive';
import HowIThink from '../components/HowIThink';
import StickerBoard from '../components/StickerBoard';
import Contact from '../components/Contact';

export default function Home({ setPage }) {
  // Accordion active indexes
  const [activeBuildIndex, setActiveBuildIndex] = useState(0); // 01 expanded by default
  const [activeWorkIndex, setActiveWorkIndex] = useState(null); // none expanded by default

  const marquee1Items = [
    "AVAILABLE FOR BACKEND WORK",
    "SPRING BOOT",
    "RESTful APIs",
    "PYTHON & JAVA",
    "DOCKER SYSTEMS",
    "NO BLOAT ALLOWED"
  ];

  const marquee2Items = [
    "Fast response beats fancy layouts.",
    "Modular designs beat monoliths.",
    "Simple code is harder to write than complex code.",
    "APIs must be stable and predictable."
  ];

  return (
    <div>
      {/* 1. Hero Section Container */}
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Hero setPage={setPage} />
        {/* Exact empty spacer div that Jignesh's layout uses to push the marquee below the fold */}
        <div className="mt-14 sm:mt-20" />
      </div>

      {/* 2. Marquee 1: Runs 100% Full Screen Width */}
      <Marquee items={marquee1Items} duration={26} dark={true} />

      {/* 3. Elevator Pitch & What I Build Container */}
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <section className="py-14 sm:py-20">
          <ElevatorPitch />
        </section>
        
        <WhatIBuild 
          activeIndex={activeBuildIndex} 
          setActiveIndex={setActiveBuildIndex} 
        />
      </div>

      {/* 4. Marquee 2: Runs 100% Full Screen Width */}
      <Marquee items={marquee2Items} reverse={true} duration={28} dark={false} />

      {/* 5. Selected Work, How I Think, StickerBoard, and Side Quest Callout Container */}
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SelectedArchive 
          activeWorkIndex={activeWorkIndex} 
          setActiveWorkIndex={setActiveWorkIndex} 
        />
        
        <HowIThink />
        
        <StickerBoard />

        {/* Side Quest Callout (Roast My Site) */}
        <section className="pb-14 sm:pb-20">
          <button
            onClick={() => {
              setPage('roast');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            className="block w-full border-[3px] border-black p-8 text-black text-left transition-transform hover:-translate-x-1 hover:-translate-y-1 sm:p-12 cursor-pointer"
            style={{ background: "var(--accent)", boxShadow: "10px 10px 0 #000" }}
          >
            <div className="text-xs font-black uppercase tracking-[0.3em]">
              {"// the side quest"}
            </div>
            <p className="mt-3 text-4xl font-black uppercase leading-none sm:text-7xl">
              ROAST MY SITE 🔥
            </p>
            <p className="mt-4 max-w-xl text-base font-bold leading-snug font-mono">
              Paste any URL and watch me tear it apart, line by line — then offer to fix it. Free brutality. Click to play →
            </p>
          </button>
        </section>
      </div>

      {/* 6. Footer / Contact Container: Runs 100% Full Screen Width with Centered Contents */}
      <Contact setPage={setPage} />
    </div>
  );
}
