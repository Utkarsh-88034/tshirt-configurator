/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 tshirt.glb 
Author: ajith98adithya (https://sketchfab.com/ajith98adithya)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/tshirt-8c838d3ea1e8494396438b5f5dc78ad8
Title: Tshirt
*/

import React, { useEffect, useRef, useState } from "react";
import {
  Decal,
  TransformControls,
  useGLTF,
  useTexture,
} from "@react-three/drei";

export function Model(props) {
  const texture = useTexture("vite.svg");

  const { nodes, materials } = useGLTF("/tshirt.glb");
  const meshRef = useRef();
  const decalRef = useRef();
  const [showDecal, setShowDecal] = useState(false);

  const updatePos = (p) => {
    decalRef.current.position.set(p.x, p.y, p.y);
  };

  useEffect(() => {
    if (meshRef.current) {
      setShowDecal(true);
    }
  }, [meshRef.current]);
  return (
    <>
      <group {...props} dispose={null} position={[0, 0, 0]}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Material1718.geometry}
              material={materials.Material1718}
              ref={meshRef}
              onPointerDown={(e) => updatePos(e.point)}
            >
              <Decal
                mesh={meshRef.current}
                ref={decalRef}
                scale={500}
                debug
                map={texture}
              />
            </mesh>

            <mesh
              geometry={nodes.Material1722.geometry}
              material={materials.Material1722}
            />
            <mesh
              geometry={nodes.Material1724.geometry}
              material={materials.Material1724}
            />
            <mesh
              geometry={nodes.Material1720.geometry}
              material={materials.Infinite_Light_1}
            />
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/tshirt.glb");