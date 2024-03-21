import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { TEE } from "./Tee";
import { CanvasTexture } from "three";
import * as THREE from "three";
import { Tee2 } from "./Tee2";
import { TEE3 } from "./Tee3";
import { TEE4 } from "./Tee4";
import { Tee6 } from "./Tee6";
import { Tee8 } from "./Tee8";
import { Shirt } from "./Shirt";
import { Shirt4 } from "./Shirt4";
import RenderFront from "./RenderFront";

function App() {
  return (
    <>
      <Canvas style={{ height: "100vh", width: "100vw" }}>
        <Stage>{<RenderFront />}</Stage>

        {/* <OrbitControls keyEvents={false} /> */}
      </Canvas>
    </>
  );
}

export default App;
