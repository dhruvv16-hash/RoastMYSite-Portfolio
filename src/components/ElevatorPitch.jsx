import { useState } from 'react';

const adjectives = ["ULTRA-FAST", "BULLETPROOF", "SCALABLE", "ROBUST", "CLEAN"];
const nouns = ["BACKENDS", "APIS", "SYSTEMS", "SERVICES", "APPLICATIONS"];

export default function ElevatorPitch() {
  const [indexes, setIndexes] = useState([0, 0]);

  const shuffle = () => {
    setIndexes([
      Math.floor(Math.random() * adjectives.length),
      Math.floor(Math.random() * nouns.length)
    ]);
  };

  return (
    <div className="border-[3px] border-black bg-white p-6 sm:p-10" style={{ boxShadow: "8px 8px 0 #000" }}>
      <div className="text-xs font-bold uppercase tracking-[0.25em] text-black/50">
        {"// the elevator pitch, randomised"}
      </div>
      <p className="mt-4 text-3xl font-black uppercase leading-[1.05] sm:text-5xl">
        I build{" "}
        <button 
          onClick={shuffle}
          className="inline-block border-[3px] border-black px-2 align-middle text-black cursor-pointer hover:bg-black hover:text-white"
          style={{ background: "var(--accent)" }}
        >
          {adjectives[indexes[0]]}
        </button>{" "}
        <button 
          onClick={shuffle}
          className="inline-block border-[3px] border-black px-2 align-middle text-black cursor-pointer hover:bg-black hover:text-white"
          style={{ background: "var(--accent)" }}
        >
          {nouns[indexes[1]]}
        </button>{" "}
        for teams who refuse to look average.
      </p>
      <button 
        onClick={shuffle}
        className="mt-6 border-[3px] border-black bg-black px-5 py-3 text-sm font-black uppercase tracking-widest text-white transition-transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
      >
        ⟳ shuffle the pitch
      </button>
    </div>
  );
}
