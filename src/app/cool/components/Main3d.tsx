'use client'
import { OrbitControls, useGLTF, useHelper } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef, useState } from "react";
import { BoxGeometry, Mesh, Object3D, SpotLight } from "three";
import { SpotLightHelper } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

function SpotLightWithHelper() {
  const lightRef = useRef<SpotLight>(null!);
  const targetRef = useRef<Object3D>(new Object3D());

  useEffect(() => {
    targetRef.current.position.set(0, 0.1, -1.13);
    lightRef.current.target = targetRef.current;
    lightRef.current.target.updateMatrixWorld();
  }, []);

  return (
    <spotLight
      ref={lightRef}
      position={[0.01, 3, -1.25]}
      angle={0.1}
      penumbra={0.5}
      intensity={100}
      castShadow
      shadow-mapSize-width={256}
      shadow-mapSize-height={256}
      target-position={[0, 0.1, -1.13]}
    />
  );
}
const Model = () => {
    const { scene } = useGLTF("/laptop.glb");
    const clonedScene = useMemo(() => clone(scene), [scene]);
    clonedScene.traverse((child) => {
        if ((child as Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    const laptopModelRef = useRef<Mesh | null>(null)
    const monitorRef = useRef<Mesh | null>(null)
    const phaseRef = useRef<number>(0)

    const monitor = clonedScene.getObjectByName('Monitor');
    if (monitor && !monitorRef.current) {
        monitorRef.current = monitor as Mesh;
    }

    useEffect(() => {
        function onScroll(){
            if(monitorRef.current)
                phaseRef.current = Math.floor(window.scrollY / 200)
        }
        onScroll()
        window.addEventListener('scroll', onScroll)

        return(() => {
            window.removeEventListener('scroll', onScroll)
        })
    }, [])

    function approachValueBy(by: number, from: number, to: number){
        let tot = 0
        // from: 0.2 and to 0.3 and by is 0.2
        // 0.2 + 0.2 - 0.3 <= 0.2 = True
        if(Math.abs(from - to) <= by) return to
        if(from < to) tot = from + by
        else tot = from - by
        return tot
    }

    useFrame((state, delta) => {
        if(monitorRef.current)console.log(delta)
        if(monitorRef.current)
        
            if(phaseRef.current == 0){
                //monitorRef.current.position.y = approachValueBy(0.001*delta*100, monitorRef.current.position.y, 0.0132)
                monitorRef.current.position.y =  0.0132
                //monitorRef.current.position.z = -0.001
                monitorRef.current.position.z = approachValueBy(0.001*delta*100, monitorRef.current.position.z, -0.001)
                //monitorRef.current.rotation.x = -1.58
                monitorRef.current.rotation.x = approachValueBy(0.01*delta*100, monitorRef.current.rotation.x, -1.58)
            } else if(phaseRef.current == 1){
                //monitorRef.current.position.y =  0.01
                monitorRef.current.position.y = approachValueBy(0.0002*delta*100, monitorRef.current.position.y, 0.01)
                //monitorRef.current.rotation.x = -1.2
                monitorRef.current.rotation.x = approachValueBy(0.01*delta*100, monitorRef.current.rotation.x, -1.2)
            } else if(phaseRef.current == 2){
                //monitorRef.current.position.y =  0.005
                monitorRef.current.position.y = approachValueBy(0.0002*delta*100, monitorRef.current.position.y, 0.005)
                //monitorRef.current.rotation.x = -0.8
                monitorRef.current.rotation.x = approachValueBy(0.01*delta*100, monitorRef.current.rotation.x, -0.8)
            } else if(phaseRef.current == 3){
                //monitorRef.current.position.y = 0.000
                monitorRef.current.position.y = approachValueBy(0.1*delta*100, monitorRef.current.position.y, 0.000)
                //monitorRef.current.rotation.x = -0.4
                monitorRef.current.rotation.x = approachValueBy(0.01*delta*100, monitorRef.current.rotation.x, -0.4)
            } else if(phaseRef.current == 4){
                monitorRef.current.position.y = 0
                //monitorRef.current.position.y = approachValueBy(0.01*delta*100, monitorRef.current.position.y, 0)
                //monitorRef.current.rotation.x = 0
                monitorRef.current.rotation.x = approachValueBy(0.01*delta*100, monitorRef.current.rotation.x, 0)
            }
    })
    return <primitive ref={laptopModelRef} shadows position={[-0.18,-0.1,-1]} rotation={[0,0,0]} object={clonedScene} />;

}
const Main3d = () => {

    return(
        <Canvas className="w-full h-full relative" camera={{position: [0,0,-2], fov:35}}>
            <ambientLight intensity={5}/>
            <OrbitControls/>
            <Model/>
            <SpotLightWithHelper/>
            <mesh position={[0,-0.196,-1]}>
                <boxGeometry args={[2,0.2,1]}/>
                <meshStandardMaterial color={"#000000"}/>
            </mesh>
        </Canvas>
    )
}

export default Main3d