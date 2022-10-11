import "./App.css"
import { Canvas } from "react-three-fiber"
import { Suspense } from "react"
import * as THREE from "three"
import Orbit from "./components/Orbit"
import Box from "./components/Box"
import Background from "./components/Background"
import Floor from "./components/Floor"
import Bulb from "./components/Bulb"
import ColorPicker from "./components/ColorPicker"
import Dragable from "./components/Dragable"

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ColorPicker />
      <Canvas
        shadowMap
        style={{ backgroundColor: "darkgrey" }}
        camera={{ position: [5, 5, 5] }}
      >
        <fog
          attach='fog'
          args={["white", 1, 20]}
        />
        <ambientLight intensity={0.2} />
        <Bulb position={[0, 4, 0]} />

        <Dragable>
          <Suspense fallback={null}>
            <Box position={[-4, 2, 0]} />
          </Suspense>

          <Suspense fallback={null}>
            <Box position={[4, 2, 0]} />
          </Suspense>
        </Dragable>

        <Suspense fallback={null}>
          <Background />
        </Suspense>

        <Floor position={[0, -0.5, 0]} />
        <Orbit />
        <axesHelper args={[5]} />
        <mesh>
          <meshBasicMaterial side={THREE.DoubleSide} />
          <geometry>
            <face3
              args={[0, 1, 2]}
              attachArray='faces'
            />
            <vector3 attachArray='vertices' />
            <vector3
              args={[0, 1, 1]}
              attachArray='vertices'
            />
            <vector3
              args={[0, 1, -1]}
              attachArray='vertices'
            />
          </geometry>
        </mesh>
      </Canvas>
    </div>
  )
}

export default App
