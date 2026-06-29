import { useState } from 'react';

const emailAddress = "dhruvvira17@gmail.com";
const linkedinUrl = "https://www.linkedin.com/in/dhruv-vira-17/"; // Placeholder or default LinkedIn

export default function Contact({ setPage }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <section id="contact" className="border-t-[3px] border-black bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-tighter sm:text-8xl">
          LET'S<br />
          <span className="text-stroke-white text-transparent">BUILD</span><br />
          SOMETHING.
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 font-mono">
          Open for backend roles, research collaborations, or contract projects. Tell me what you are architecting — or just say hi.
        </p>
        
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <button
              onClick={copyEmail}
              className="w-full break-all border-[3px] border-black bg-white px-5 py-4 text-left text-lg font-black uppercase tracking-wide text-black transition-colors hover:bg-black hover:text-white cursor-pointer"
              style={{ boxShadow: "6px 6px 0 var(--accent)" }}
            >
              {copied ? "COPIED ✓" : emailAddress}
            </button>
          </div>
          
          <a
            href={`mailto:${emailAddress}?subject=Hello%20Dhruv`}
            className="border-[3px] border-white px-5 py-4 text-center text-lg font-black uppercase transition-colors hover:bg-white hover:text-black"
          >
            EMAIL →
          </a>
          
          <a
            href="https://github.com/dhruvv16-hash"
            target="_blank"
            rel="noopener noreferrer"
            className="border-[3px] border-white px-5 py-4 text-center text-lg font-black uppercase transition-colors hover:bg-white hover:text-black"
          >
            GITHUB →
          </a>
        </div>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t-[3px] border-white/30 pt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 font-mono">
          <span>DHRUV MAYUR VIRA — BACKEND DEVELOPER & CS UNDERGRADUATE</span>
          <button
            onClick={() => {
              setPage('roast');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            className="underline decoration-2 underline-offset-4 hover:text-white cursor-pointer bg-transparent border-none p-0 uppercase"
          >
            roast a site →
          </button>
        </footer>
      </div>
    </section>
  );
}
