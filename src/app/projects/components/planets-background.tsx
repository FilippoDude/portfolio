"use client";
import { FlyControls, useGLTF, useProgress } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import gsap from "gsap";
function DebugSpotlight() {
  //useHelper(lightRef, SpotLightHelper, "cyan");

  return (
    <spotLight
      position={[0, 0.5, -1]}
      angle={Math.PI / 4}
      penumbra={0.8}
      intensity={5}
      castShadow
      target-position={[-0, -0.1, -0.5]}
    />
  );
}
function WidgetCrateLogo() {
  const { scene } = useGLTF("/widgetCrateLogoWeb.glb");
  const clonedScene = useMemo(() => clone(scene), [scene]);
  return (
    <primitive
      shadows
      position={[-0.4, -0.19, -0.55]}
      rotation={[0, 3, 0]}
      scale={[0.015, 0.015, 0.015]}
      object={clonedScene}
    />
  );
}
export function PlanetsBackground() {
  const { progress } = useProgress();
  if (typeof window === "undefined") return null;
  const { scene } = useGLTF("/laptop.glb");
  const clonedScene = useMemo(() => clone(scene), [scene]);
  const canvasRef = useRef(null);
  useEffect(() => {
    if (progress === 100) {
      gsap.to(canvasRef.current, { opacity: 1, duration: 2 });
    }
  }, [progress]);
  return (
    <div ref={canvasRef} className="w-full h-full opacity-0">
      <Canvas camera={{ position: [0, 0, -2], fov: 35 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={5} />
        <DebugSpotlight />
        <WidgetCrateLogo />
        <primitive
          shadows
          position={[-0.18, -0.2, -0.5]}
          rotation={[0, 0, 0]}
          object={clonedScene}
        />
        <mesh position={[0, -5.2, -0.5]}>
          <boxGeometry args={[10, 10, 1]} />
          <meshStandardMaterial color={"#000000"} />
        </mesh>
      </Canvas>
    </div>
  );
}
