// Single source of truth for all portfolio content.

export const hero = {
  name: "Ethan Buskell",
  tagline: "Engineering student. Precise by design.",
  subTagline: "Predicted A* · Further Maths · Maths · Computer Science · Physics",
  oneLiner:
    "Aspiring mechanical engineer with a strong foundation in maths and physics — designing and building real-world systems with CAD, 3D printing, and hardware integration.",
};

export const about = {
  body: "Ethan is a sixth-form student at Norwich School in Norfolk, predicted A* in Further Mathematics, Mathematics, Computer Science, and Physics after GCSEs of seven 9s, two 8s, a 7 and a 6. An aspiring mechanical engineer, he designs and builds real systems — Fusion 360 CAD, Bambu Lab 3D printing, and hardware integration — and ships software alongside. He holds a Duke of Edinburgh Gold award, played two years in the school's 1st XI football team, and is a qualified referee.",
  predictedGrades: [
    "Further Mathematics",
    "Mathematics",
    "Computer Science",
    "Physics",
  ],
  // Predicted A* is shown in the grades table, so it's intentionally not repeated here.
  highlights: [
    "GCSE: seven 9s, two 8s, a 7 and a 6 — Norwich School",
    "Duke of Edinburgh — Gold, Silver & Bronze",
    "School 1st XI football, two years · qualified referee",
    "Outstanding achievement award for GCSE results",
  ],
};

export type Job = {
  role: string;
  org: string;
  location: string;
  points: string[];
};

export const experience: Job[] = [
  {
    role: "Retail Assistant",
    org: "E J Cook & Co",
    location: "Norwich",
    points: [
      "Delivered front-line customer service",
      "Kept the store clean and well organised",
      "Handled perishable goods to standard",
    ],
  },
  {
    role: "Kitchen Porter",
    org: "The Boathouse",
    location: "Ormesby",
    points: [
      "Worked in a team of 8–9",
      "Performed efficiently under sustained, high pressure",
    ],
  },
  {
    role: "Paper Delivery",
    org: "Town & Country News",
    location: "Hickling",
    points: [
      "Delivered to 160+ houses for a local newspaper",
      "Sustained the round reliably for two years",
    ],
  },
];

export type ProjectCategory = "Software" | "Hardware & CAD";

export type Project = {
  name: string;
  description: string;
  stack: string[];
  category: ProjectCategory;
  // Flagship project — gets the wider card + "Flagship" badge.
  featured?: boolean;
  // Optional sub-feature chips, used to break up dense flagship descriptions.
  modules?: string[];
  href?: string;
};

// Display order of the grouped project sections.
export const projectCategories: ProjectCategory[] = ["Software", "Hardware & CAD"];

export const projects: Project[] = [
  {
    name: "Webtrips",
    description:
      "Ski-holiday travel agency with a Node.js backend, AI-driven price estimates, and a MySQL database. Hosted on Render.",
    stack: ["Node.js", "MySQL", "AI"],
    category: "Software",
  },
  {
    name: "County Cutters",
    description:
      "Landscaping business website, hand-built and deployed on GitHub Pages — used to advertise and run a small landscaping business.",
    stack: ["HTML", "CSS", "GitHub Pages"],
    category: "Software",
  },
  {
    name: "Resale Deal-Finder",
    description:
      "eBay UK + Facebook Marketplace scraper scoring underpriced items by estimated resale margin.",
    stack: ["Python", "FastAPI"],
    category: "Software",
  },
  {
    name: "Automated Donkey Treat Dispenser",
    description:
      "Weatherproof outdoor treat dispenser in PETG, validated over 12 months of outdoor testing — with a TikTok feature that triggers dispensing from live-stream audience engagement.",
    stack: ["Fusion 360", "PETG", "Python"],
    category: "Hardware & CAD",
  },
  {
    name: "Robot Lamp (Lelamp)",
    description:
      "Articulated robot lamp that reacts to real-world inputs. Load-bearing joints redesigned in Fusion 360 for +70% tensile strength to carry added servos; emotions and kinematics coded in.",
    stack: ["Fusion 360", "Python"],
    category: "Hardware & CAD",
    featured: true,
  },
  {
    name: "iQuad Speaker Control Panel",
    description:
      "Reverse-engineered amplifier control panel, rebuilt with modern hardware inside the original casing and refined for efficient 3D-printed production.",
    stack: ["Hardware", "3D printing"],
    category: "Hardware & CAD",
  },
];

export type CadModel = {
  name: string;
  description: string;
  src: string;
  // Per-model dimension callouts shown on hover (technical-drawing convention).
  dims: { top: string; bottom: string };
};

export const cadModels: CadModel[] = [
  {
    name: "Donkey Treat Dispenser",
    description:
      "Weatherproof PETG enclosure, 12 months outdoor-tested; TikTok-triggered dispensing on live streams.",
    src: "/models/treat-dispenser.glb",
    dims: { top: "Ø 48mm", bottom: "±0.1mm Rev A" },
  },
  {
    name: "Robot Lamp (Lelamp)",
    description:
      "Articulated lamp reacting to real-world inputs; Fusion 360 joints redesigned for +70% tensile strength.",
    src: "/models/robot-lamp.glb",
    dims: { top: "Ø 32mm", bottom: "±0.2mm Rev B" },
  },
  {
    name: "iQuad Speaker Panel",
    description:
      "Reverse-engineered amplifier control panel, rebuilt with modern hardware in the original casing.",
    src: "/models/speaker-panel.glb",
    dims: { top: "120 × 60mm", bottom: "±0.1mm Rev A" },
  },
];

export const cadNote = "Drag to rotate · Scroll to zoom · Designed in Fusion 360";

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    label: "CAD & Manufacturing",
    items: ["Fusion 360 (assemblies, drawings)", "Bambu Lab 3D printing", "Soldering"],
  },
  { label: "Programming", items: ["Python", "Node.js", "HTML / CSS"] },
  { label: "Tools", items: ["Git / GitHub", "Adobe Suite", "Microsoft Office"] },
  {
    label: "Strengths",
    items: ["Teamwork & leadership", "Customer service", "Working under pressure"],
  },
];

export const contact = {
  email: "ethan.buskell@gmail.com",
  github: "https://github.com/etbus07",
  githubLabel: "github.com/etbus07",
  linkedin: "https://www.linkedin.com/in/ethan-buskell-bb47a52a9",
  location: "Norfolk, UK",
  cv: "/cv.pdf",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "CAD", href: "#cad" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
