export type CassetteCategory = "work" | "volunteer" | "hobbies";

export type Cassette = {
  name: string;
  category: CassetteCategory;
  imageClass: string;
  caption: string;
};

export const CASSETTES: Cassette[] = [
  { name: "Solution Soft", category: "work", imageClass: "solution-soft", caption: "Enterprise systems / engineering archive" },
  { name: "Titan Tech", category: "work", imageClass: "titan-tech", caption: "Technology / systems archive" },
  { name: "IEDC", category: "work", imageClass: "iedc", caption: "Innovation and entrepreneurship archive" },
  { name: "Meddit", category: "work", imageClass: "meddit", caption: "Hackathon / product archive" },
  { name: "Relief", category: "volunteer", imageClass: "relief", caption: "Community response archive" },
  { name: "Startup Weekend / ICPC", category: "volunteer", imageClass: "startup-icpc", caption: "Competitions and events archive" },
  { name: "Personal", category: "hobbies", imageClass: "personal", caption: "Private memories archive" },
];
