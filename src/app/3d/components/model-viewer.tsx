"use client";
import { OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Component, ReactNode, Suspense, useEffect, useMemo } from "react";
import { Box3, Material, Mesh, PMREMGenerator, Vector3 } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

// Built-in studio reflections, so metallic PBR parts (visors, plates) aren't black.
// Generated in the browser, nothing to download.
function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.6;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

export interface ModelStats {
  meshes: number;
  triangles: number;
  vertices: number;
}

function Model({
  file,
  rotation,
  wireframe,
  onStats,
}: {
  file: string;
  rotation?: [number, number, number];
  wireframe: boolean;
  onStats: (stats: ModelStats) => void;
}) {
  const { scene } = useGLTF(file);
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
    <group rotation={rotation ?? [0, 0, 0]} scale={scale}>
      <primitive object={clonedScene} position={center.clone().negate()} />
    </group>
  );
}

function LoadingOverlay() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <p role="status" className="font-spec m-0 text-[0.82rem] text-(--muted)">
        Loading model… {Math.round(progress)}%
      </p>
    </div>
  );
}

class LoadError extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function ModelViewer({
  file,
  rotation,
  wireframe,
  autoRotate,
  onStats,
}: {
  file: string;
  rotation?: [number, number, number];
  wireframe: boolean;
  autoRotate: boolean;
  onStats: (stats: ModelStats) => void;
}) {
  const fallback = (
    <div className="flex h-full items-center justify-center p-6 text-center text-(--muted)">
      <p className="m-0">
        The 3D model couldn&apos;t load in this browser. The render below shows it.
      </p>
    </div>
  );
  return (
    <LoadError fallback={fallback}>
      <Canvas camera={{ position: [0, 1.2, 4.5], fov: 35 }} fallback={fallback}>
        <StudioEnvironment />
        <hemisphereLight args={["#ffffff", "#2c303a", 3.5]} />
        <directionalLight position={[3, 5, 4]} intensity={4.5} />
        {/* Soft front fill so dark PBR gear (black armour, masks) keeps its detail */}
        <directionalLight position={[0, 1, 6]} intensity={2} />
        <directionalLight position={[-4, 2, -3]} intensity={2} color="#ee7a3a" />
        <Suspense fallback={null}>
          <Model
            key={file}
            file={file}
            rotation={rotation}
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
      <LoadingOverlay />
    </LoadError>
  );
}
