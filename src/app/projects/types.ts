export interface Project {
  name: string;
  description: string;
  backgroundImage: string;
  previewImage: string;
  usedTech: TechRecordType[];
  innerPage: React.ReactNode;
  github?: string;
  latestGithubCommit?: Date;
}

interface TechRecordType {
  displayName: string;
  logoImageSrc: string;
}
type TechType = "react" | "node" | "typescript" | "android";
type TechTypes = Partial<Record<TechType, TechRecordType>>;
export const BaseTechTypes: Record<TechType, TechRecordType> = {
  react: { displayName: "React", logoImageSrc: "/reactLogo.png" },
  node: { displayName: "Node", logoImageSrc: "/nodeLogo.png" },
  typescript: {
    displayName: "Typescript",
    logoImageSrc: "/typescriptLogo.png",
  },
  android: { displayName: "Android", logoImageSrc: "" },
};
