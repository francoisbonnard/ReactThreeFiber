import "./App.css"
import { Canvas, useFrame, useThree, extend } from "react-three-fiber"
import { useRef, useEffect } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
extend({ OrbitControls })

const Orbit = () => {
  const { camera, gl } = useThree()
  useEffect(() => {
    // useEffect : actions qui peuvent affecter d’autres composants et qui ne peuvent pas être réalisées pendant l’affichage
    const controls = new OrbitControls(camera, gl.domElement)
    controls.minDistance = 3
    controls.maxDistance = 20
    return () => {
      controls.dispose()
    }
  }, [camera, gl])
  return null
}

const Box = (props) => {
  const ref = useRef()
  // useRef va renvoyer un objet modifiable qui n’impactera pas le cycle de vie du composant. 
  useFrame((state) => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  })
  return (
    <mesh
      ref={ref}
      {...props}
    >
      <boxBufferGeometry />
      <meshBasicMaterial color='blue' />
    </mesh>
  )
}

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas
        style={{ backgroundColor: "darkgrey" }}
        camera={{ position: [3, 3, 3] }}
      >
        <Box position={[1, 1, 0]} />
        <Orbit />
        <axesHelper args={[5]} />
      </Canvas>
    </div>
  )
}

export default App
