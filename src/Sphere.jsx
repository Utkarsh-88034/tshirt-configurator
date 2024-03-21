import { Decal, useGLTF, useTexture } from "@react-three/drei";
import React from "react";

const Sphere = () => {
  const texture = useTexture("vite.svg");
  const { nodes } = useGLTF("tshirt.glb");
  console.log(nodes);
  return (
    <mesh receiveShadow castShadow geometry={nodes.Material1718.geometry}>
      {/* <primitive object={obj} /> */}
      {/* <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial color={"red"} /> */}
      <Decal
        position={[1, 0, 0]}
        debug // Makes "bounding box" of the decal visible
        // Rotation of the decal (can be a vector or a degree in radians)
        scale={0.5}
      >
        <meshBasicMaterial
          map={texture}
          polygonOffset
          polygonOffsetFactor={-1} // The material should take precedence over the original
        />
      </Decal>
    </mesh>
    // <primitive object={obj} />
  );
};

export default Sphere;
