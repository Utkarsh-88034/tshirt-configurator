import { Edges, Image, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DragControls } from "three/addons/controls/DragControls.js";

const RenderImage = ({ position }) => {
  const { camera, gl } = useThree();
  const imgRef = useRef();
  const scaleTexture = useTexture("/scale.svg");
  const rotateTexture = useTexture("/rotate.svg");

  const [showGizmo, setShowGizmo] = useState([false, null]);
  const [isDragging, setIsDragging] = useState(false);
  const [gizmoType, setGizmoType] = useState("scale");
  const initialMousePosition = useRef(null);
  const initialScale = useRef(null);
  const initialRotation = useRef(null);

  const dragRef = useRef(null);
  const handleImageHover = (img) => {
    img.geometry.computeBoundingBox();
    const boundingBox = img.geometry.boundingBox;

    setShowGizmo([true, boundingBox]);
  };

  const handlePointerDown = (event, type) => {
    setIsDragging(true);
    setGizmoType(type);
    initialMousePosition.current = new THREE.Vector2(
      event.clientX,
      event.clientY
    );
    initialScale.current = imgRef.current.scale.clone();
    initialRotation.current = imgRef.current.rotation.clone();
    console.log(initialRotation);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    initialMousePosition.current = null;
    initialScale.current = null;
  };

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (isDragging && event.buttons == 1) {
        dragRef.current.deactivate();

        const mouseDelta = new THREE.Vector2(event.clientX, event.clientY).sub(
          initialMousePosition.current
        );
        if (gizmoType == "scale") {
          const scaleDelta = mouseDelta.x * 0.01;
          imgRef.current.scale.x = initialScale.current.x + scaleDelta;
          imgRef.current.scale.y = initialScale.current.y + scaleDelta;
        } else if (gizmoType == "rotate") {
          const rotateDeltaX = mouseDelta.x * 0.01;
          const rotateDeltaY = mouseDelta.y * 0.01;

          // Adjust rotation around the Z-axis based on both X and Y mouse deltas
          imgRef.current.rotation.z =
            initialRotation.current.z + rotateDeltaX - rotateDeltaY;

          //   imgRef.current.rotation.y = initialRotation.current.y + rotateDelta;
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current.activate();
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (!dragRef.current && imgRef.current) {
      dragRef.current = new DragControls(
        [imgRef.current],
        camera,
        gl.domElement
      );
      dragRef.current.transfromGroup = true;
    }
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
        setShowGizmo([false, showGizmo[1]]);
      }}
    >
      {showGizmo[0] && (
        <>
          <Edges linewidth={10} scale={1} threshold={15} color="red" />
          <mesh
            position={[showGizmo[1].max.x, showGizmo[1].min.y, 0]}
            onPointerDown={(e) => {
              handlePointerDown(e, "scale");
            }}
            onPointerUp={handlePointerUp}
          >
            <planeGeometry args={[0.2, 0.2]} />
            <meshPhysicalMaterial map={scaleTexture} transparent />
          </mesh>
          <mesh
            position={[showGizmo[1].max.x, showGizmo[1].max.y, 0]}
            onPointerDown={(e) => {
              handlePointerDown(e, "rotate");
            }}
            onPointerUp={handlePointerUp}
          >
            <planeGeometry args={[0.2, 0.2]} />
            <meshPhysicalMaterial map={rotateTexture} transparent />
          </mesh>
        </>
      )}
    </Image>
  );
};

export default RenderImage;
