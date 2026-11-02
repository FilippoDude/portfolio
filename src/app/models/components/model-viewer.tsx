"use client";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo } from "react";
import { Box3, Material, Mesh, Vector3 } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { Model3d } from "../data";

export interface ModelStats {
  meshes: number;
  triangles: number;
  vertices: number;
}

function Model({
  model,
  wireframe,
  onStats,
}: {
  model: Model3d;
  wireframe: boolean;
  onStats: (stats: ModelStats) => void;
}) {
  const { scene } = useGLTF(model.file);
  // Cloned (materials too) so the wireframe toggle doesn't leak into other
  // pages that load the same file from the cache
  const clonedScene = useMemo(() => {
    const cloned = clone(scene);
    cloned.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;
      mesh.material = Array.isArray(mesh.material)
        ? mesh.material.map((m) => m.clone())
        : mesh.material.clone();
    });
    return cloned;
  }, [scene]);

  useEffect(() => {
    const stats: ModelStats = { meshes: 0, triangles: 0, vertices: 0 };
    clonedScene.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;
      const position = mesh.geometry.getAttribute("position");
      stats.meshes++;
      stats.vertices += position.count;
      stats.triangles += (mesh.geometry.index?.count ?? position.count) / 3;
    });
    onStats(stats);
  }, [clonedScene]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;
      const materials: Material[] = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      materials.forEach((m) => {
        if ("wireframe" in m) (m as Material & { wireframe: boolean }).wireframe = wireframe;
      });
    });
  }, [clonedScene, wireframe]);

  // Normalise every model to the same size around the origin, so the camera
  // never has to be tuned per model
  const { center, scale } = useMemo(() => {
    const box = new Box3().setFromObject(clonedScene);
    const size = box.getSize(new Vector3());
    return {
      center: box.getCenter(new Vector3()),
      scale: 2 / Math.max(size.x, size.y, size.z),
    };
  }, [clonedScene]);

  return (
    <group rotation={model.rotation ?? [0, 0, 0]} scale={scale}>
      <primitive object={clonedScene} position={center.clone().negate()} />
    </group>
  );
}

export default function ModelViewer({
  model,
  wireframe,
  autoRotate,
  onStats,
}: {
  model: Model3d;
  wireframe: boolean;
  autoRotate: boolean;
  onStats: (stats: ModelStats) => void;
}) {
  return (
    <Canvas camera={{ position: [0, 1.2, 4.5], fov: 35 }}>
      <hemisphereLight args={["#ffffff", "#425173", 3]} />
      <directionalLight position={[3, 5, 4]} intensity={4} />
      <directionalLight position={[-4, 2, -3]} intensity={2} color="#E49D53" />
      <Suspense fallback={null}>
        <Model
          key={model.slug}
          model={model}
          wireframe={wireframe}
          onStats={onStats}
        />
      </Suspense>
      <OrbitControls
        makeDefault
        minDistance={2}
        maxDistance={10}
        autoRotate={autoRotate}
        autoRotateSpeed={1.5}
        enablePan={false}
      />
    </Canvas>
  );
}
