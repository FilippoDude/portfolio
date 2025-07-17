
import { Canvas } from '@react-three/fiber'
import { Mesh } from "three"
import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";
function Model({ url }: {url: string}) {
  const { scene } = useGLTF(url);
    scene.traverse((child) => {
    if ((child as Mesh).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  return <primitive shadows position={[0.08,-0.15,2.54]} rotation={[0,3.3,0]} object={scene} />;
}
const Laptop3d = () => {
    return(
        <Canvas camera={{ position: [0, 0, 3.3], fov: 35 }} shadows>
            <ambientLight intensity={2} />
            <spotLight
                position={[0, 5, 6]} // Above & slightly in front
                angle={Math.PI / 6}
                penumbra={0.3}
                intensity={50}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />
            <Suspense fallback={null}>
                <Model url="/laptop.glb" />
            </Suspense>
            <mesh position={[0, -0.65, 2.5]}>
                <boxGeometry args={[2, 1, 1]}/>
                <meshStandardMaterial color="#4E3000" />
            </mesh>
        </Canvas>
    )
}

export default Laptop3d