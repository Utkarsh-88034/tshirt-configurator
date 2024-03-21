import { Edges, Image, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DragControls } from "three/addons/controls/DragControls.js";

const RenderImage = ({ position }) => {
  const { camera, gl } = useThree();
  const imgRef = useRef();
  const scaleTexture = useTexture("/scale.svg");
  const [showScale, setShowScale] = useState([false, new THREE.Vector3()]);
  const [isDragging, setIsDragging] = useState(false);
  const initialMousePosition = useRef(null);
  const initialScale = useRef(null);
  const dragRef = useRef(null);
  const handleImageHover = (img) => {
    img.geometry.computeBoundingBox();
    const boundingBox = img.geometry.boundingBox;

    setShowScale([
      true,
      showScale[1].set(boundingBox.max.x, boundingBox.min.y, 0),
    ]);
  };

  const handlePointerDown = (event) => {
    console.log(dragRef);
    // dragRef.current.enabled = false;
    setIsDragging(true);
    initialMousePosition.current = new THREE.Vector2(
      event.clientX,
      event.clientY
    );
    initialScale.current = imgRef.current.scale.clone();
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    initialMousePosition.current = null;
    initialScale.current = null;
  };

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (isDragging && event.buttons == 1) {
        const mouseDelta = new THREE.Vector2(event.clientX, event.clientY).sub(
          initialMousePosition.current
        );
        const scaleDelta = mouseDelta.x * 0.01;
        imgRef.current.scale.x = initialScale.current.x + scaleDelta;
        imgRef.current.scale.y = initialScale.current.y + scaleDelta;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const controls = new DragControls([imgRef.current], camera, gl.domElement);
    controls.transfromGroup = true;
  }, [imgRef.current]);
  return (
    <Image
      position={position}
      ref={imgRef}
      url="123.png"
      segments={1}
      scale={0.5}
      onPointerOver={(e) => {
        handleImageHover(e.eventObject);
      }}
      onPointerLeave={() => {
        setShowScale([false, showScale[1]]);
      }}
    >
      {showScale[0] && (
        <>
          <Edges linewidth={10} scale={1} threshold={15} color="red" />
          <mesh
            position={showScale[1]}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            <planeGeometry args={[0.2, 0.2]} />
            <meshPhysicalMaterial map={scaleTexture} transparent />
          </mesh>
        </>
      )}
    </Image>
  );
};

export default RenderImage;
