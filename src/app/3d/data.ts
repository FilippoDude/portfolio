export type ModelSection = "gear" | "other";

export interface Model3d {
  slug: string;
  name: string;
  variant: string;
  section: ModelSection;
  kind: string;
  description: string;
  // Exported from the model's EXPORT_ collection in Blender, served from /public
  file: string;
  render: string;
  renderWidth: number;
  renderHeight: number;
  renderNote: string;
  tris: number;
  tools: string[];
  // Only facts from the Roblox store, never estimates
  store?: string;
  link?: { label: string; href: string };
  // Rotation that makes the model face the camera, in radians
  rotation?: [number, number, number];
}

export const ROBLOX_STORE =
  "https://www.roblox.com/communities/34697290/Bobux-Gang#!/store";
export const EMAIL = "filippogrochala@gmail.com";

const CYCLES = "Studio render, Blender Cycles";
const EEVEE = "Preview render, Blender Eevee";

// To add a model: export its EXPORT_ collection to /public/3d/models as .glb,
// put a render in /public/3d/renders and add an entry here
export const models: Model3d[] = [
  {
    slug: "jmp-plate-carrier",
    name: "JMP Plate Carrier",
    variant: "GOC colourway",
    section: "gear",
    kind: "Body armour",
    description:
      "A JMP-style plate carrier in Global Occult Coalition black and blue, made as a Roblox avatar accessory. Modelled in Blender and textured in Substance Painter with a full PBR set. It's part of my best-selling line.",
    file: "/3d/models/jmp-viper-goc.glb",
    render: "/3d/renders/jmp-viper-goc.jpg",
    renderWidth: 900,
    renderHeight: 900,
    renderNote: CYCLES,
    tris: 3969,
    tools: ["Blender", "Substance Painter", "Roblox Studio"],
    store: "169 favorites (UN version)",
  },
  {
    slug: "nox-tactical-helmet",
    name: "Nox Tactical Helmet",
    variant: "UN ice digital camo",
    section: "gear",
    kind: "Helmet",
    description:
      "A modern ballistic helmet with side rails, a front mount, cushion pads and chin straps, textured in Substance Painter in a UN ice-blue digital camo. The same base mesh also has black and GOC variants.",
    file: "/3d/models/nox-helmet-un.glb",
    render: "/3d/renders/nox-helmet-un.jpg",
    renderWidth: 900,
    renderHeight: 900,
    renderNote: CYCLES,
    tris: 5213,
    tools: ["Blender", "Substance Painter", "Roblox Studio"],
    store: "17 favorites",
    // Front three-quarter view, with the front mount on the right
    rotation: [0, (-3 * Math.PI) / 4, 0],
  },
  {
    slug: "un-cap",
    name: "United By All Nations Cap",
    variant: "Wool, embroidered logo",
    section: "gear",
    kind: "Hat",
    description:
      "A baseball cap in UN blue with a wool texture and an embroidered logo on the front, made as a Roblox hat accessory.",
    file: "/3d/models/un-cap.glb",
    render: "/3d/renders/un-cap.jpg",
    renderWidth: 900,
    renderHeight: 900,
    renderNote: CYCLES,
    tris: 1117,
    tools: ["Blender", "Photoshop", "Roblox Studio"],
    store: "21 favorites",
    rotation: [0, Math.PI, 0],
  },
  {
    slug: "hazmat-mask",
    name: "Hazmat Foundation Mask",
    variant: "SCP Foundation visor",
    section: "gear",
    kind: "Mask",
    description:
      "A full hazmat hood with an SCP-orange visor, the Foundation logo on the glass and a metal frame, made for SCP roleplay groups on Roblox.",
    file: "/3d/models/hazmat-mask.glb",
    render: "/3d/renders/hazmat-mask.jpg",
    renderWidth: 900,
    renderHeight: 900,
    renderNote: EEVEE,
    tris: 2398,
    tools: ["Blender", "Roblox Studio"],
    rotation: [0, Math.PI, 0],
  },
  {
    slug: "d-class-balaclava",
    name: "D-Class Balaclava",
    variant: "SCP Foundation",
    section: "gear",
    kind: "Mask",
    description:
      "A knitted balaclava for SCP roleplay, with a fabric texture. It's published in two versions, compact and extended.",
    file: "/3d/models/dclass-balaclava.glb",
    render: "/3d/renders/dclass-balaclava.jpg",
    renderWidth: 900,
    renderHeight: 900,
    renderNote: CYCLES,
    tris: 2334,
    tools: ["Blender", "Roblox Studio"],
    store: "12 favorites per version",
  },
  {
    slug: "heavy-headphones",
    name: "Heavy Headphones",
    variant: "Orange ear cups",
    section: "gear",
    kind: "Head accessory",
    description:
      "Chunky over-ear headset with orange ear cups and a boom mic, built as a Roblox head accessory.",
    file: "/3d/models/heavy-headphones.glb",
    render: "/3d/renders/heavy-headphones.jpg",
    renderWidth: 900,
    renderHeight: 900,
    renderNote: EEVEE,
    tris: 3963,
    tools: ["Blender", "Roblox Studio"],
    rotation: [0, Math.PI, 0],
  },
  {
    slug: "purple-horns",
    name: "Purple Horns",
    variant: "Striped, hand-painted",
    section: "gear",
    kind: "Head accessory",
    description:
      "A pair of curved, striped horns made as a Roblox head accessory, with a baked texture painted over in Photoshop.",
    file: "/3d/models/purple-horns.glb",
    render: "/3d/renders/purple-horns.jpg",
    renderWidth: 900,
    renderHeight: 900,
    renderNote: EEVEE,
    tris: 3740,
    tools: ["Blender", "Photoshop", "Roblox Studio"],
    rotation: [0, Math.PI, 0],
  },
  {
    slug: "widgets-crate-logo",
    name: "Widgets Crate Logo",
    variant: "App logo in 3D",
    section: "other",
    kind: "Branding",
    description:
      "The 3D version of the logo for Widgets Crate, my Android widgets app: a pixel-style chest full of widget icons. A lighter version of it runs live on my developer portfolio.",
    file: "/3d/models/widgets-crate-logo.glb",
    render: "/3d/renders/widgets-crate-logo.jpg",
    renderWidth: 1200,
    renderHeight: 675,
    renderNote: CYCLES,
    tris: 194,
    tools: ["Blender", "Photoshop"],
    link: { label: "Widgets Crate app", href: "https://widgetscrate.filippodude.com" },
    // Front (lock and widget icons) towards the camera, turned slightly
    rotation: [0, -Math.PI / 6, 0],
  },
  {
    slug: "laptop",
    name: "Laptop",
    variant: "Website hero prop",
    section: "other",
    kind: "Prop",
    description:
      "A laptop modelled for the 3D scene on my developer portfolio, with a textured screen and a backlit keyboard.",
    file: "/3d/models/laptop.glb",
    render: "/3d/renders/laptop.jpg",
    renderWidth: 900,
    renderHeight: 900,
    renderNote: EEVEE,
    tris: 12834,
    tools: ["Blender"],
    link: { label: "See it on the 3D laptop page", href: "/cool" },
    rotation: [0, Math.PI, 0],
  },
  {
    slug: "card-holder",
    name: "Card Holder",
    variant: "Product mockup",
    section: "other",
    kind: "Prop",
    description:
      "A product mockup of a card holder, with a rubber-textured sleeve and a placeholder card design.",
    file: "/3d/models/card-holder.glb",
    render: "/3d/renders/card-holder.jpg",
    renderWidth: 900,
    renderHeight: 900,
    renderNote: EEVEE,
    tris: 1172,
    tools: ["Blender"],
  },
];

export const getModel = (slug: string) => models.find((m) => m.slug == slug);

// Transparent render of the GLB, so the page's own stage colour shows behind it
export const cutoutOf = (m: Model3d) =>
  m.file.replace("/models/", "/cutouts/").replace(".glb", ".webp");
