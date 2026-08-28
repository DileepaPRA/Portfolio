export interface IconEntry {
  x: string;
  y: string;
  char: string;    // monospace syntax character / symbol
  size?: number;   // font-size in px (default 38)
  rotate?: number;
}

// Programming syntax symbols scattered across each section background.
// Sizes 28–58px so they read clearly at low opacity.

export const SECTION_ICONS: Record<string, IconEntry[]> = {
  // Hero: full-height section — icons pushed to outer edges, away from center text
  hero: [
    { x: "2%",  y: "8%",  char: ">_",  size: 100, rotate: -6 },
    { x: "83%", y: "12%", char: "#",   size: 112 },
    { x: "91%", y: "52%", char: "{}",  size: 96,  rotate: 12 },
    { x: "1%",  y: "68%", char: "()",  size: 104 },
    { x: "55%", y: "88%", char: "</>", size: 90,  rotate: -4 },
  ],

  // About: tall section — scatter top-right, mid-left, lower-right
  about: [
    { x: "78%", y: "5%",  char: "#",   size: 88,  rotate: 10 },
    { x: "2%",  y: "28%", char: "{}",  size: 82 },
    { x: "88%", y: "44%", char: "//",  size: 70,  rotate: -8 },
    { x: "6%",  y: "72%", char: "()",  size: 78 },
    { x: "68%", y: "82%", char: "[]",  size: 72,  rotate: 6 },
  ],

  // Education: place along diagonals, avoid center
  education: [
    { x: "5%",  y: "5%",  char: "</>", size: 80 },
    { x: "82%", y: "18%", char: "{}",  size: 86,  rotate: -10 },
    { x: "1%",  y: "55%", char: "::",  size: 72,  rotate: 14 },
    { x: "86%", y: "68%", char: "#",   size: 90 },
    { x: "38%", y: "90%", char: "()",  size: 76,  rotate: -5 },
  ],

  // Skills: denser content — icons at far edges
  skills: [
    { x: "88%", y: "4%",  char: ">_",  size: 82 },
    { x: "1%",  y: "18%", char: "&&",  size: 76,  rotate: 8 },
    { x: "90%", y: "55%", char: "{}",  size: 88,  rotate: -12 },
    { x: "3%",  y: "78%", char: "</>", size: 72 },
    { x: "62%", y: "88%", char: "()",  size: 78,  rotate: 5 },
  ],

  // Projects: wide cards layout — icons hug the very edges
  projects: [
    { x: "1%",  y: "10%", char: "{}",  size: 84 },
    { x: "85%", y: "6%",  char: "//",  size: 74,  rotate: -9 },
    { x: "91%", y: "60%", char: "()",  size: 88 },
    { x: "2%",  y: "65%", char: "[]",  size: 78,  rotate: 7 },
    { x: "46%", y: "87%", char: "#",   size: 80,  rotate: -5 },
  ],

  // University: carousel section — icons above and below carousel
  university: [
    { x: "6%",  y: "4%",  char: "()",  size: 80 },
    { x: "80%", y: "9%",  char: "{}",  size: 86,  rotate: -8 },
    { x: "93%", y: "48%", char: "//",  size: 70,  rotate: 10 },
    { x: "0%",  y: "62%", char: "#",   size: 88 },
    { x: "52%", y: "90%", char: "<>",  size: 74,  rotate: -6 },
  ],

  // Achievements: two-part layout — icons between sections
  achievements: [
    { x: "88%", y: "3%",  char: "#",   size: 92 },
    { x: "2%",  y: "14%", char: "{}",  size: 80,  rotate: 6 },
    { x: "90%", y: "50%", char: "&&",  size: 76,  rotate: -10 },
    { x: "1%",  y: "70%", char: "()",  size: 84 },
    { x: "40%", y: "88%", char: "//",  size: 70,  rotate: 8 },
  ],

  // Contact: two-col form — icons at outer edges
  contact: [
    { x: "2%",  y: "7%",  char: ">_",  size: 82 },
    { x: "84%", y: "4%",  char: "{}",  size: 88,  rotate: -7 },
    { x: "92%", y: "55%", char: "#",   size: 90 },
    { x: "1%",  y: "68%", char: "()",  size: 78,  rotate: 9 },
    { x: "50%", y: "86%", char: "[]",  size: 72,  rotate: -4 },
  ],
};
