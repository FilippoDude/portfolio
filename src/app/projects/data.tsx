import { Project } from "./types";
import CopypasteProject from "./projects/copypaste";

const GITHUB = "https://github.com/FilippoDude";

export const projects: Project[] = [
  {
    slug: "copypaste",
    name: "Copypaste",
    tagline: "Share text between devices in real time, no account needed.",
    description:
      "A web app for moving long text between devices quickly. You create or join a session and everything typed in it is synced live over websockets to every connected device. There's no login and no ads: a reCAPTCHA protects session creation, and hosts can add a password on top.",
    category: "Web",
    tech: ["Next.js", "TypeScript", "Node.js", "WebSockets", "MUI", "Docker"],
    year: 2026,
    previewImage: "/copypaste-project/main-menu.png",
    innerPage: <CopypasteProject />,
    github: "copypaste",
    projectLink: `${GITHUB}/copypaste`,
    demoLink: "https://copypaste.filippodude.com",
    featured: true,
    priority: 1,
  },
  {
    slug: "widgets-crate",
    name: "Widgets Crate",
    tagline: "An Android app full of home screen widgets.",
    description:
      "A mobile app that bundles a collection of Android home screen widgets. The app is built with Flutter, and the widgets themselves use native Kotlin code. It ships with its own download website, which pulls the latest releases straight from the GitHub API so the download page is always up to date.",
    category: "Mobile",
    tech: ["Flutter", "Kotlin", "Android", "Next.js", "GSAP"],
    year: 2025,
    previewImage:
      "https://github.com/user-attachments/assets/e4cb7d46-4372-4856-b0af-c03355c71992",
    gallery: [
      {
        src: "https://github.com/user-attachments/assets/e4cb7d46-4372-4856-b0af-c03355c71992",
        alt: "Widgets Crate screenshot 1",
      },
      {
        src: "https://github.com/user-attachments/assets/c26cbf0a-eccd-4ec0-9f42-e827a0c98c91",
        alt: "Widgets Crate screenshot 2",
      },
      {
        src: "https://github.com/user-attachments/assets/cb9a740c-c0a8-4936-bb06-613049f72dd1",
        alt: "Widgets Crate screenshot 3",
      },
      {
        src: "https://github.com/user-attachments/assets/8131feca-8c59-4529-89cf-f533ee2b47ae",
        alt: "Widgets Crate screenshot 4",
      },
    ],
    highlights: [
      "Flutter UI with native Kotlin widgets",
      "Download website that fetches releases through the GitHub API",
      "Public beta release on GitHub",
    ],
    github: "widgetCrateDownloadWebsite",
    projectLink: `${GITHUB}/widgetscratepub`,
    demoLink: "https://widgetscrate.filippodude.com",
    priority: 2,
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    tagline: "The website you're looking at right now.",
    description:
      "My personal site, constantly being reworked. It mixes regular pages with 3D scenes: a Blender-modelled laptop, the 3D background on this page and a small platformer built entirely with React Three Fiber.",
    category: "3D",
    tech: ["Next.js", "TypeScript", "Three.js", "React Three Fiber", "GSAP", "Tailwind"],
    year: 2025,
    previewImage: "/portfolioPreview.png",
    highlights: [
      "3D laptop modelled in Blender and animated with GSAP",
      "2D platformer made only with React Three Fiber",
      "Project list that reads update dates from the GitHub API",
    ],
    github: "portfolio",
    projectLink: `${GITHUB}/portfolio`,
    demoLink: "https://filippodude.com",
    priority: 3,
  },
  {
    slug: "infinity-bar",
    name: "Infinity Bar",
    tagline: "A small 3D demo website.",
    description:
      "A small experiment combining Next.js with a simple Three.js scene through React Three Fiber, with GSAP driving the animations.",
    category: "3D",
    tech: ["Next.js", "Three.js", "React Three Fiber", "GSAP", "Tailwind"],
    year: 2025,
    github: "infinitybar",
    projectLink: `${GITHUB}/infinitybar`,
    demoLink: "https://infinitybar.filippodude.com",
    priority: 4,
  },
  {
    slug: "polaris-training",
    name: "Polaris Training",
    tagline: "A landing page built from a Polaris design.",
    description:
      "A landing page implemented from a design by Polaris. The goal was to reproduce the design faithfully and bring it to life with scroll and entrance animations.",
    category: "Web",
    tech: ["Next.js", "React", "Tailwind", "GSAP"],
    year: 2025,
    previewImage:
      "https://github.com/user-attachments/assets/c65113d8-6d8b-47d5-ad37-813ccd0a457c",
    gallery: [
      {
        src: "https://github.com/user-attachments/assets/c65113d8-6d8b-47d5-ad37-813ccd0a457c",
        alt: "Polaris Training landing page",
      },
    ],
    github: "polaristraining",
    projectLink: `${GITHUB}/polaristraining`,
    demoLink: "https://polaristraining.filippodude.com",
    priority: 5,
  },
  {
    slug: "cats-minigame",
    name: "Cats Minigame",
    tagline: "A small Telegram mini app where you play with cats.",
    description:
      "A small, unfinished minigame where you interact with cats to earn points. It's written in React and TypeScript with Vite and uses the Telegram Mini Apps SDK so it can run inside Telegram.",
    category: "Games",
    tech: ["React", "TypeScript", "Vite", "Telegram Mini Apps", "Tailwind"],
    year: 2024,
    previewImage:
      "https://github.com/user-attachments/assets/faefcb29-5e2f-471a-a978-63d195c395a7",
    gallery: [
      {
        src: "https://github.com/user-attachments/assets/faefcb29-5e2f-471a-a978-63d195c395a7",
        alt: "Cats minigame screenshot 1",
      },
      {
        src: "https://github.com/user-attachments/assets/bab5102c-cc18-41bf-ab29-a9c41f5856b3",
        alt: "Cats minigame screenshot 2",
      },
    ],
    github: "pspspsgame_client",
    projectLink: `${GITHUB}/pspspsgame_client`,
    archived: true,
    priority: 6,
  },
  {
    slug: "filesharer",
    name: "Filesharer",
    tagline: "Upload files to a server and share them.",
    description:
      "A full-stack app for saving and sharing files. Users log in, upload files to the server and download them later. The client is React with Vite and the backend is Express in TypeScript, with authentication handled through JWT tokens.",
    category: "Web",
    tech: ["React", "Vite", "Express", "TypeScript", "JWT"],
    year: 2025,
    github: "filesharer",
    projectLink: `${GITHUB}/filesharer`,
    archived: true,
    priority: 7,
  },
  {
    slug: "simple-download",
    name: "Simple Download With Password",
    tagline: "Password-protected file downloads.",
    description:
      "A small Next.js front end paired with an Express server that only serves a file after the right password is entered.",
    category: "Web",
    tech: ["Next.js", "Express", "TypeScript", "Docker"],
    year: 2025,
    github: "SimpleDownloadWithPassword",
    projectLink: `${GITHUB}/SimpleDownloadWithPassword`,
    archived: true,
    priority: 8,
  },
  {
    slug: "matematica",
    name: "Matematica",
    tagline: "Finds the root of a function with the bisection method.",
    description:
      "A school project: you type a function of x and an interval, and the site finds a root using the bisection method, showing every midpoint it tried along the way. Expressions are parsed and checked before being evaluated.",
    category: "School",
    tech: ["React", "TypeScript", "Vite"],
    year: 2025,
    github: "matematica",
    projectLink: `${GITHUB}/matematica`,
    archived: true,
    priority: 9,
  },
  {
    slug: "imperial-realm",
    name: "Imperial Realm",
    tagline: "A website written in plain HTML and CSS.",
    description:
      "A static website written without any framework, just HTML and CSS, with comments in the code explaining the relevant parts.",
    category: "School",
    tech: ["HTML", "CSS"],
    year: 2025,
    github: "imperialRealm",
    projectLink: `${GITHUB}/imperialRealm`,
    archived: true,
    priority: 10,
  },
];
