import gsap from "gsap"
import three, { Canvas } from '@react-three/fiber'
import { Mesh } from "three"
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
function Model({ url }: {url: string}) {
  const { scene } = useGLTF(url);
  return <primitive position={[0.16,-0.1,2.54]} rotation={[0.1,3.3,0]} object={scene} />;
}
const Laptop3d = () => {
    return(
        <Canvas camera={{ position: [0, 0, 3] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <Suspense fallback={null}>
                <Model url="/laptop.glb" />
            </Suspense>
            <OrbitControls/>
        </Canvas>
    )
}

export default Laptop3d