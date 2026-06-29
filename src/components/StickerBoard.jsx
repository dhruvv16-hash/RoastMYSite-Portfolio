import { useState, useRef } from 'react';

function Sticker({ children, x, y, rot }) {
  const [coords, setCoords] = useState({ x, y });
  const startPos = useRef(null);

  const handlePointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    startPos.current = {
      sx: e.clientX,
      sy: e.clientY,
      ox: coords.x,
      oy: coords.y
    };
  };

  const handlePointerMove = (e) => {
    if (!startPos.current) return;
    setCoords({
      x: startPos.current.ox + (e.clientX - startPos.current.sx),
      y: startPos.current.oy + (e.clientY - startPos.current.sy)
    });
  };

  const handlePointerUp = () => {
    startPos.current = null;
  };

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="absolute cursor-grab touch-none select-none border-[3px] border-black px-4 py-2 text-sm font-black uppercase tracking-wide active:cursor-grabbing"
      style={{
        left: 0,
        top: 0,
        transform: `translate(${coords.x}px, ${coords.y}px) rotate(${rot}deg)`,
        background: "var(--accent)",
        boxShadow: "5px 5px 0 #000"
      }}
    >
      {children}
    </button>
  );
}

export default function StickerBoard() {
  const stickers = [
    { text: "DRAG ME →", x: 24, y: 30, r: -6 },
    { text: "DOCKERIZED", x: 220, y: 60, r: 5 },
    { text: "SPRING BOOT", x: 70, y: 150, r: -3 },
    { text: "SHIP IT", x: 320, y: 150, r: 8 },
    { text: "API FIRST", x: 150, y: 240, r: -7 },
    { text: "NO MEMORY LEAKS", x: 360, y: 250, r: 4 }
  ];

  return (
    <section className="pb-14 sm:pb-20">
      <h2 className="mb-2 text-4xl font-black uppercase tracking-tighter sm:text-6xl">
        DRAG STUFF AROUND
      </h2>
      <p className="mb-6 text-sm font-bold uppercase tracking-widest text-black/50 font-mono">
        {"// because static is boring. grab the stickers."}
      </p>
      <div 
        className="relative h-[340px] w-full overflow-hidden border-[3px] border-black bg-white sm:h-[320px]"
        style={{
          boxShadow: "8px 8px 0 #000",
          backgroundImage: "radial-gradient(#0001 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px"
        }}
      >
        {stickers.map(sticker => (
          <Sticker key={sticker.text} x={sticker.x} y={sticker.y} rot={sticker.r}>
            {sticker.text}
          </Sticker>
        ))}
      </div>
    </section>
  );
}
