import { useState, useEffect } from 'react';

export default function ScrambledText({ text, className, style }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return;
    }
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@%&*/\\<>0123456789";
    let iterations = 0;
    const maxIterations = 1.6 * text.length + 8;
    
    const interval = setInterval(() => {
      iterations++;
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            // Decode character if index is past the current iteration progress
            if (index < iterations / 1.6) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations > maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 26);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className} style={style}>
      {displayText}
    </span>
  );
}
