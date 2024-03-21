import {
  DragControls,
  Edges,
  Image,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  RenderTexture,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import React from "react";
import * as THREE from "three";

const RenderFront = () => {
  const { scene, nodes } = useGLTF("/tee-center-uv2.glb");

  const texture = useTexture("/stripes.svg");
  const bgtexture = useTexture("/baked-stripes-front.png");
  bgtexture.flipY = false;

  return (
    <>
      <mesh geometry={nodes["70_1"].geometry}>
        <meshPhysicalMaterial transparent>
          <RenderTexture attach="map" generateMipmaps height={400} width={400}>
            <PerspectiveCamera
              makeDefault
              manual
              aspect={1 / 1}
              position={[0, 0, 3]}
            />
            <ambientLight intensity={2} />
            <DragControls>
              <Image
                url="123.png"
                opacity={1}
                side={THREE.DoubleSide}
                segments={1}
                scale={1}
              >
                <Edges linewidth={3} scale={1.01} threshold={15} color="blue" />
              </Image>
            </DragControls>
          </RenderTexture>
        </meshPhysicalMaterial>
        <mesh geometry={nodes["70_1"].geometry}>
          <meshPhysicalMaterial map={bgtexture} />
        </mesh>
      </mesh>
      <mesh geometry={nodes["64_1"].geometry}>
        <meshPhysicalMaterial>
          <RenderTexture
            attach="map"
            generateMipmaps
            height={400}
            width={400}
            // anisotropy={16}
          >
            <PerspectiveCamera
              makeDefault
              manual
              aspect={1 / 1}
              position={[0, 0, 3]}
              // fov={20}
            />
            <ambientLight intensity={2} />

            <color attach="background" args={["orange"]} />
            <Plane args={[2.5, 1.5]}>
              <meshPhysicalMaterial map={texture} />
            </Plane>

            <DragControls>
              <Image
                url="123.png"
                opacity={1}
                side={THREE.DoubleSide}
                segments={1}
                scale={1}
              >
                <Edges linewidth={3} scale={1.01} threshold={15} color="blue" />
              </Image>
            </DragControls>
          </RenderTexture>
        </meshPhysicalMaterial>
      </mesh>
      <mesh geometry={nodes["31_1"].geometry}></mesh>
      <mesh geometry={nodes["28_1"].geometry}></mesh>
    </>
  );
};

export default RenderFront;
