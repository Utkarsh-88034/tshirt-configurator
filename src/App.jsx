import { Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css";
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
