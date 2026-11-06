"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { ModelStats } from "./model-viewer";

// WebGL only exists in the browser
const ModelViewer = dynamic(() => import("./model-viewer"), { ssr: false });

function Toggle({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-theme min-h-11 cursor-pointer border px-3.5 text-[0.85rem] font-semibold transition-colors duration-150 ${pressed ? "border-(--accent) bg-(--accent) text-(--accent-ink)" : "border-(--line) bg-(--panel) text-(--fg) hover:border-(--accent)"}`}
    >
      {children}
    </button>
  );
}

export default function ViewerPanel({
  file,
  name,
  rotation,
}: {
  file: string;
  name: string;
  rotation?: [number, number, number];
}) {
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [stats, setStats] = useState<ModelStats | null>(null);

  // Start spinning only for people who haven't asked for reduced motion
  useEffect(() => {
    setAutoRotate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div>
      <div className="stage rounded-theme relative aspect-square w-full overflow-hidden border border-(--line) sm:aspect-[4/3]">
        <div
          role="img"
          aria-label={`Interactive 3D model of the ${name}`}
          className="absolute inset-0"
        >
          <ModelViewer
            file={file}
            rotation={rotation}
            wireframe={wireframe}
            autoRotate={autoRotate}
            onStats={setStats}
          />
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <Toggle pressed={wireframe} onClick={() => setWireframe(!wireframe)}>
            Wireframe
          </Toggle>
          <Toggle pressed={autoRotate} onClick={() => setAutoRotate(!autoRotate)}>
            Auto-rotate
          </Toggle>
        </div>
        {stats ? (
          <p className="font-spec rounded-theme absolute bottom-3 left-3 m-0 flex gap-3 border border-(--line) bg-(--panel) px-3 py-2 text-[0.8rem] text-(--muted)">
            <span>{stats.triangles.toLocaleString("en-US")} tris</span>
            <span>{stats.vertices.toLocaleString("en-US")} verts</span>
            <span>{stats.meshes} meshes</span>
          </p>
        ) : null}
      </div>
      <p className="mt-2 mb-0 text-[0.82rem] text-(--muted)">
        Drag to rotate, scroll or pinch to zoom.
      </p>
    </div>
  );
}
