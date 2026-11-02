export type ProjectCategory = "Web" | "Mobile" | "3D" | "Games" | "School";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  tech: string[];
  year: number;
  previewImage?: string;
  gallery?: ProjectImage[];
  highlights?: string[];
  // Custom detail page, shown instead of the generated one
  innerPage?: React.ReactNode;
  // Repo name under FilippoDude, used to fetch the last update date
  github?: string;
  projectLink?: string;
  demoLink?: string;
  featured?: boolean;
  // Shown in the smaller "Earlier work" list instead of the main grid
  archived?: boolean;
  priority: number;
}
