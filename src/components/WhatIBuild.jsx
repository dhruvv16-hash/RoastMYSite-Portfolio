import { useState } from 'react';

const items = [
  {
    no: "01",
    title: "Robust APIs & Integrations",
    body: "Secure, scalable RESTful web services built with Spring Boot and Java. Tailored to support high-traffic frontend interfaces and reliable data flows."
  },
  {
    no: "02",
    title: "High-Performance Data Systems",
    body: "Optimized database structures, index configurations, and JPA/JDBC integrations that cut response latency and automate complex query operations."
  },
  {
    no: "03",
    title: "Practical AI & ML Integrations",
    body: "Connecting applications to LLMs (like Gemini API) and custom ML scripts (TF-IDF, cosine similarity) to add intelligence without creating noise."
  },
  {
    no: "04",
    title: "System Architecture & Automation",
    body: "Containerizing backend builds using Docker, cleaning up monolithic debt, and automating workflows with Python scripts and clean object-oriented code."
  }
];

export default function WhatIBuild({ activeIndex, setActiveIndex }) {
  return (
    <section className="pb-14 sm:pb-20">
      <h2 className="mb-8 text-4xl font-black uppercase tracking-tighter sm:text-6xl">
        WHAT I BUILD
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {items.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <button
              key={item.no}
              onClick={() => setActiveIndex(isOpen ? null : index)}
              className="v2-card block w-full border-[3px] border-black bg-white p-6 text-left cursor-pointer"
              style={{ boxShadow: "8px 8px 0 #000" }}
            >
              <div className="flex items-baseline justify-between">
                <span 
                  className="text-5xl font-black sm:text-6xl text-stroke-black transition-colors"
                  style={{ color: isOpen ? "var(--accent)" : "transparent" }}
                >
                  {item.no}
                </span>
                <span className="text-2xl font-black">
                  {isOpen ? "–" : "+"}
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-black uppercase leading-none">
                {item.title}
              </h3>
              {isOpen && (
                <p className="mt-3 text-sm leading-relaxed text-black/80 font-mono">
                  {item.body}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
