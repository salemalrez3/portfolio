export type CassetteCategory = "work" | "volunteer" | "hobbies";

export type CassetteSigil =
  | "grid" | "triangle" | "circle" | "cross" | "wave" | "star" | "heart";

export type CassetteSection = { heading: string; items: string[] };

export type CassetteSignature = {
  accent: string;   // bright accent — used for chrome, glows, sigil
  dim: string;      // dim accent — used for backgrounds, borders
  sigil: CassetteSigil;
};

export type Cassette = {
  name: string;
  shortName: string;
  category: CassetteCategory;
  imageClass: string;
  caption: string;
  signature: CassetteSignature;

  role: string;
  period?: string;
  location?: string;
  badge?: string;
  summary: string;
  sections: CassetteSection[];
  tech?: string[];
};

export const CASSETTES: Cassette[] = [
  {
    name: "Solution Soft",
    shortName: "SOLUTION",
    category: "work",
    imageClass: "solution-soft",
    caption: "Enterprise systems · engineering archive",
    signature: { accent: "#6BA8D9", dim: "rgba(107, 168, 217, 0.16)", sigil: "grid" },
    role: "Full-Stack Developer",
    period: "July 2024 – Present",
    location: "Damascus, Syria",
    badge: "NDA · SEALED",
    summary:
      "Enterprise web application work under NDA. Built complex, high-performance interfaces and shipped enterprise-grade features alongside a full-stack team.",
    sections: [
      {
        heading: "WHAT I BUILT",
        items: [
          "NDA-protected web application in React / TypeScript with advanced state management (Redux, Context API) and custom hooks.",
          "Custom UI solutions when standard component libraries proved limiting.",
          "Migration of a desktop application to a lightweight web version — significantly improving accessibility.",
        ],
      },
      {
        heading: "STACK & PRACTICE",
        items: [
          "RESTful API design and integration, validated through Postman.",
          "ASP.NET (Web Forms & Windows Forms) and DevExpress components for enterprise features.",
          "Clean architecture, performance caching, Azure DevOps workflow.",
        ],
      },
    ],
    tech: ["React", "TypeScript", "ASP.NET", "DevExpress", "Redux", "MUI", "Azure DevOps"],
  },
  {
    name: "Titan Tech",
    shortName: "TITAN",
    category: "work",
    imageClass: "titan-tech",
    caption: "Front-end engineering · internship archive",
    signature: { accent: "#F5A34A", dim: "rgba(245, 163, 74, 0.16)", sigil: "triangle" },
    role: "Software Engineering Intern",
    location: "Damascus, Syria",
    summary:
      "Front-end engineering internship focused on the React ecosystem — data fetching, caching, and integrating custom APIs into production surfaces.",
    sections: [
      {
        heading: "WHAT I LEARNED",
        items: [
          "React Query for efficient data fetching and cache management.",
          "Integration of custom RESTful APIs into live React applications.",
          "DevOps fundamentals: version control, task tracking, collaborative workflows.",
        ],
      },
    ],
    tech: ["React", "React Query", "REST", "Git"],
  },
  {
    name: "IEDC",
    shortName: "IEDC",
    category: "work",
    imageClass: "iedc",
    caption: "IT operations · support archive",
    signature: { accent: "#58B88A", dim: "rgba(88, 184, 138, 0.16)", sigil: "circle" },
    role: "IT Support",
    location: "Damascus, Syria",
    summary:
      "IT operations and infrastructure support for an international cooperation and development institute.",
    sections: [
      {
        heading: "WHAT I DID",
        items: [
          "Provided technical assistance and maintained IT infrastructure.",
          "Streamlined procurement processes for technology equipment.",
        ],
      },
    ],
  },
  {
    name: "Meddit",
    shortName: "MEDDIT",
    category: "work",
    imageClass: "meddit",
    caption: "Hackathon · product archive",
    signature: { accent: "#E2585C", dim: "rgba(226, 88, 92, 0.16)", sigil: "cross" },
    role: "Backend Developer",
    period: "2025",
    badge: "HACKATHON WINNER",
    summary:
      "Backend engineer for Meddit — one of the winning projects of the Syrian Hackathon 2025. Real-time patient–doctor communication built on WebSockets.",
    sections: [
      {
        heading: "WHAT I BUILT",
        items: [
          "REST APIs in FastAPI for the patient–doctor platform.",
          "WebSocket-based chat for real-time, bidirectional messaging.",
          "Shipped in a cross-functional team under agile methodology, on a competition clock.",
        ],
      },
    ],
    tech: ["FastAPI", "WebSockets", "Python", "Agile"],
  },
  {
    name: "Relief",
    shortName: "RELIEF",
    category: "volunteer",
    imageClass: "relief",
    caption: "Community response archive",
    signature: { accent: "#E8B14C", dim: "rgba(232, 177, 76, 0.16)", sigil: "wave" },
    role: "Disaster Relief Volunteer",
    location: "Damascus, Syria",
    summary:
      "Volunteer work with earthquake response initiatives — coordinated local relief and supported emergency crisis response on the ground.",
    sections: [
      {
        heading: "WHAT I DID",
        items: [
          "Coordinated local relief efforts across Damascus.",
          "Supported emergency crisis response logistics and on-site operations.",
        ],
      },
    ],
  },
  {
    name: "Startup Weekend / ICPC",
    shortName: "STARTUP",
    category: "volunteer",
    imageClass: "startup-icpc",
    caption: "Competitions and events archive",
    signature: { accent: "#A97BDC", dim: "rgba(169, 123, 220, 0.16)", sigil: "star" },
    role: "Competitor",
    badge: "COMPETITION",
    summary:
      "Two competitions on the record — a 54-hour Startup Weekend organized by Startup Syria with Techstars, and an invitation-only collegiate programming competition.",
    sections: [
      {
        heading: "STARTUP WEEKEND · TECHSTARS",
        items: [
          "Selected for a 54-hour intensive competition in partnership with Techstars.",
          "Built an MVP from scratch in a cross-functional team of 5 — developers, designers, entrepreneurs.",
        ],
      },
      {
        heading: "PRIVATE COLLEGIATE PROGRAMMING COMPETITION",
        items: [
          "Invited on short notice to represent the university.",
          "Solved complex data structure, dynamic programming, and graph theory problems under strict time constraints.",
        ],
      },
    ],
    tech: ["C++", "Python", "React", "Fastify"],
  },
  {
    name: "Personal",
    shortName: "PERSONAL",
    category: "hobbies",
    imageClass: "personal",
    caption: "Private memories archive",
    signature: { accent: "#DE85A6", dim: "rgba(222, 133, 166, 0.16)", sigil: "heart" },
    role: "Off record",
    summary:
      "The file the department keeps sealed. Nothing classified — just the parts of the week that aren't on a résumé.",
    sections: [
      {
        heading: "PASTIMES",
        items: [
          "Football",
          "Chess",
          "Swimming",
          "Camping & nature exploration",
          "Table tennis",
          "MMA",
        ],
      },
    ],
  },
];