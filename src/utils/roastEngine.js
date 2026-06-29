// Deterministic Roast Engine based on Domain Hash (FNV-1a + LCG PRNG)

const categoriesConfig = [
  {
    key: "speed",
    label: "LOAD SPEED",
    lines: [
      "Loads slower than a dial-up connection in a rainstorm.",
      "I aged waiting for your HTML to load. Just the text, not even images.",
      "Your website doesn't load — it negotiates with the browser.",
      "A massive bundle of bloated JS to render a blank page. Outstanding.",
      "Lighthouse took one look at your bundle size and crashed.",
      "First Contentful Paint? More like Eventual Contentful Paint."
    ]
  },
  {
    key: "design",
    label: "VISUAL DESIGN",
    lines: [
      "Six fonts. Three are fighting. Two are losing. One is Comic Sans.",
      "The color palette looks like a traffic cone fell into a 2003 PowerPoint.",
      "Whitespace called. It's requesting political asylum from your layout.",
      "Every single element is shouting at the user. None are saying anything.",
      "Bootstrap default layout and proud of it, huh?",
      "The drop shadows are so heavy they are affecting the page's gravity."
    ]
  },
  {
    key: "copy",
    label: "COPYWRITING",
    lines: [
      "“A leading provider of cutting-edge solutions.” Of what? To whom?",
      "I read the entire homepage and still have no idea what you sell.",
      "Your headline contains 4 buzzwords and 0 meaning. Impressive.",
      "You used the word 'synergy' and 'blockchain' in the same sentence.",
      "The primary button says 'Submit.' Submit to what? Disappointment?",
      "Three paragraphs about your 'journey' and zero about the user's problem."
    ]
  },
  {
    key: "originality",
    label: "ORIGINALITY",
    lines: [
      "I have seen this exact landing page template at 500 other startups.",
      "The hero image is a stock photo of people pointing at a blank screen.",
      "It is giving 'first result on a free template marketplace.'",
      "Your 'unique selling proposition' is neither unique nor a proposition.",
      "Even the Lorem Ipsum text looks bored of this layout.",
      "Gradient mesh blob. Floating iPhone mockup. We've all been here."
    ]
  },
  {
    key: "mobile",
    label: "MOBILE OPTIMIZATION",
    lines: [
      "On mobile, the navigation menu is a literal treasure hunt.",
      "Tried to click a link and accidentally subscribed to three newsletters.",
      "Horizontal scroll on a mobile screen. A certified usability crime.",
      "The font size is so small I had to squint through a magnifying glass.",
      "Buttons are 4px apart. My thumbs are not needles.",
      "It is 'responsive' in the same way a brick is aerodynamic."
    ]
  },
  {
    key: "trust",
    label: "TRUST & POPUPS",
    lines: [
      "Four popups before I could read a single word. Record speed.",
      "A cookie banner that takes up 80% of the viewport. Why?",
      "A chatbot waved and beeped at me before the page loaded. Too clingy.",
      "A 'spin the wheel' discount popup. Let's leave that in 2018.",
      "'Trusted by industry leaders.' Names? Logos? No? Just trust me?",
      "An exit-intent popup triggered when my mouse moved 2px."
    ]
  }
];

const verdicts = [
  "There is a real business buried under here. It deserves a site that isn't actively repelling visitors.",
  "The structural bones are fine, but the skin is on fire. Good news: fire can be extinguished.",
  "You don't need a minor update. You need an intervention. Fortunately, I build things that actually work.",
  "This isn't a website; it's a cry for help with a domain registrar record attached.",
  "Honestly? Ten good design choices away from great. You have made exactly two of them.",
  "It's not bad. It is worse: it's forgettable. That is the one thing no business can afford to be."
];

export const statusMessages = [
  "resolving dns ... found it, unfortunately",
  "measuring load time ... still measuring ...",
  "counting fonts ... too many detected",
  "scanning for original layouts ... 0 results",
  "checking mobile responsiveness ... oh no",
  "tallying exit-intent popups ... please stop",
  "reading copywriting ... out loud, in disbelief",
  "compiling final roast ..."
];

const gradeScales = [
  { min: 0, label: "CERTIFIED DISASTER", note: "We need to talk. Urgently." },
  { min: 34, label: "ROUGH STYLE", note: "It's trying. That is the sad part." },
  { min: 52, label: "AGGRESSIVELY MID", note: "Nobody hates it. Nobody remembers it." },
  { min: 70, label: "ACTUALLY DECENT", note: "Annoyingly fine. I can still build better." },
  { min: 86, label: "...OK YOU'RE GOOD", note: "Rare. Suspicious. Let's build something." }
];

export function cleanDomain(url) {
  let clean = url.trim().toLowerCase();
  clean = clean.replace(/^https?:\/\//, "").replace(/^www\./, "");
  clean = clean.split(/[/?#]/)[0];
  return clean || "your-site.com";
}

// 32-bit FNV-1a hash
function fnv1a(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

// Deterministic Roast Generator
export function generateRoast(rawUrl) {
  const domain = cleanDomain(rawUrl);
  let seed = fnv1a(domain);
  
  // Linear Congruential Generator (LCG) for deterministic pseudo-random values
  const rand = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  
  const categories = categoriesConfig.map(cat => {
    const score = Math.round(14 + 58 * rand()); // deterministic score [14, 72]
    const lineIndex = Math.floor(rand() * cat.lines.length);
    return {
      key: cat.key,
      label: cat.label,
      score: score,
      line: cat.lines[lineIndex]
    };
  });
  
  const totalScore = Math.round(categories.reduce((acc, cat) => acc + cat.score, 0) / categories.length);
  
  const matchedGrade = [...gradeScales]
    .reverse()
    .find(g => totalScore >= g.min) || gradeScales[0];
    
  const verdictIndex = Math.floor(rand() * verdicts.length);
  
  return {
    domain,
    score: totalScore,
    grade: matchedGrade.label,
    gradeNote: matchedGrade.note,
    categories,
    verdict: verdicts[verdictIndex]
  };
}
