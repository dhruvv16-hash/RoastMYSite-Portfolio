export default function Marquee({ items, reverse, duration = 24, dark = true }) {
  const textContent = items.join("   ✺   ") + "   ✺   ";
  
  return (
    <div 
      className={`v2-marq overflow-hidden border-y-[3px] border-black py-3 select-none ${
        dark ? "bg-black text-white" : "text-black"
      }`}
      style={dark ? {} : { background: "var(--accent)" }}
    >
      <div 
        className="v2-track flex w-max whitespace-nowrap"
        style={{ 
          animation: `${reverse ? "v2mR" : "v2mL"} ${duration}s linear infinite` 
        }}
      >
        <span className="px-4 text-xl font-black uppercase tracking-tight sm:text-2xl">
          {textContent}
        </span>
        <span className="px-4 text-xl font-black uppercase tracking-tight sm:text-2xl" aria-hidden="true">
          {textContent}
        </span>
      </div>
    </div>
  );
}
