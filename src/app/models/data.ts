export interface Model3d {
  slug: string;
  name: string;
  description: string;
  // Path to a .glb file in /public
  file: string;
  tools: string[];
  year: number;
  // Initial rotation so the model faces the camera, in radians
  rotation?: [number, number, number];
}

// To add a model: export it from Blender as .glb into /public and add an entry here
export const models: Model3d[] = [
  {
    slug: "laptop",
    name: "Laptop",
    description:
      "A stylised laptop with a textured screen and backlit keyboard. It's the model used on the home page and on the 3D laptop page.",
    file: "/laptop.glb",
    tools: ["Blender"],
    year: 2025,
    rotation: [0, Math.PI, 0],
  },
  {
    slug: "widgets-crate-logo",
    name: "Widgets Crate logo",
    description:
      "The 3D version of the Widgets Crate app logo, a crate full of widgets. A lighter version of it floats in the background of the projects page.",
    file: "/widgetCrateLogo.glb",
    tools: ["Blender"],
    year: 2025,
    rotation: [0, Math.PI, 0],
  },
];
