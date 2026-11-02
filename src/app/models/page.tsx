"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { models } from "./data";
import type { ModelStats } from "./components/model-viewer";

// WebGL only exists in the browser
const ModelViewer = dynamic(() => import("./components/model-viewer"), {
  ssr: false,
});

const ModelsPage = () => {
  const [selected, setSelected] = useState(models[0]);
  const [wireframe, setWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [stats, setStats] = useState<ModelStats | null>(null);

  const selectModel = (model: (typeof models)[number]) => {
    setStats(null);
    setSelected(model);
  };

  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden bg-[#0F101B] flex flex-col items-center px-4 sm:px-10 pb-20">
      <h1 className="font-raleway-sans text-6xl font-black text-white mt-32 sm:mt-40">
        3D Models
      </h1>
      <p className="text-white opacity-70 text-xl mt-2 text-center max-w-150">
        Models I&apos;ve made in Blender. Drag to rotate, scroll to zoom.
      </p>

      <div className="mt-10 w-full max-w-320 flex flex-col lg:flex-row gap-4">
        <div className="relative w-full lg:flex-1 h-[60vh] min-h-100 rounded-2xl overflow-hidden bg-linear-to-b from-[#17192A] to-[#0B0C14] border border-[#ffffff15]">
          <ModelViewer
            model={selected}
            wireframe={wireframe}
            autoRotate={autoRotate}
            onStats={setStats}
          />
          <div className="absolute top-3 right-3 flex flex-row gap-2">
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`cursor-pointer text-sm font-bold px-3 py-2 rounded-md text-white duration-100 ${wireframe ? "bg-[#E49D53]" : "bg-[#00000080] hover:bg-[#000000b0]"}`}
            >
              Wireframe
            </button>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`cursor-pointer text-sm font-bold px-3 py-2 rounded-md text-white duration-100 ${autoRotate ? "bg-[#E49D53]" : "bg-[#00000080] hover:bg-[#000000b0]"}`}
            >
              Auto-rotate
            </button>
          </div>
          {stats ? (
            <div className="absolute bottom-3 left-3 flex flex-row gap-3 text-xs text-white opacity-70 bg-[#00000080] px-3 py-2 rounded-md">
              <span>{stats.triangles.toLocaleString()} tris</span>
              <span>{stats.vertices.toLocaleString()} verts</span>
              <span>{stats.meshes} meshes</span>
            </div>
          ) : null}
        </div>

        <div className="lg:w-96 flex flex-col gap-4">
          <div className="rounded-2xl bg-[#17192A] border border-[#ffffff15] p-6 flex flex-col gap-3">
            <div className="flex flex-row items-center gap-2 text-xs">
              {selected.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-[#E49D53] font-bold uppercase tracking-wider"
                >
                  {tool}
                </span>
              ))}
              <span className="text-white opacity-50">{selected.year}</span>
            </div>
            <h2 className="font-raleway-sans font-black text-white text-3xl">
              {selected.name}
            </h2>
            <p className="text-white opacity-75">{selected.description}</p>
          </div>

          <div className="flex flex-col gap-2">
            {models.map((model) => (
              <button
                key={model.slug}
                onClick={() => selectModel(model)}
                className={`cursor-pointer text-left px-5 py-4 rounded-xl border duration-200 transition-all flex flex-row items-center justify-between ${selected.slug == model.slug ? "bg-[#425173b0] border-[#E49D5380]" : "bg-[#17192Ab0] border-[#ffffff10] hover:bg-[#293247b0]"}`}
              >
                <span className="font-raleway-sans font-bold text-white">
                  {model.name}
                </span>
                <span className="text-white opacity-50 text-sm">
                  {model.year}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelsPage;
