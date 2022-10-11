import "./App.css";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  useLoader,
} from "react-three-fiber";
import { useRef, useEffect, Suspense } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
extend({ OrbitControls });

const Orbit = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    // useEffect : actions qui peuvent affecter d’autres composants et qui ne peuvent pas être réalisées pendant l’affichage
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 3;
    controls.maxDistance = 20;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

const Box = (props) => {
  const ref = useRef();
  // useRef va renvoyer un objet modifiable qui n’impactera pas le cycle de vie du composant.

  const texture = useLoader(THREE.TextureLoader, "/rock.jpg");

  useFrame((state) => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={ref}
      {...props}
      castShadow
      //receiveShadow
    >
      <sphereBufferGeometry args={[0.2, 32, 32]}/>
      {/* <boxBufferGeometry /> */}
      {/* <meshBasicMaterial color='blue' /> */}
      {/* <meshPhysicalMaterial color="blue" opacity={0.5} transparent wireframe /> */}
      {/* <meshPhysicalMaterial color="blue" opacity={0.5}  metalness={1} roughness={0} /> */}
      <meshPhysicalMaterial map={texture} />
      {/* <meshPhysicalMaterial
        color="white"
        fog={false}
        transparent
        clearcoat={1}
        roughness={0}
        transmission={0.7}
        reflectivity={1}
        side={THREE.DoubleSide}
      /> */}
    </mesh>
  );
};
const Floor = (props) => {
  return (
    <mesh {...props} receiveShadow>
      <boxBufferGeometry args={[5, 1, 5]} />
      <meshPhysicalMaterial />
    </mesh>
  );
};
const Bulb = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.2, 16, 16]} />
      <meshPhongMaterial emissive={"yellow"} />
    </mesh>
  );
};

const Background = props => {
  const texture = useLoader(THREE.TextureLoader,"/background.jpg")
  const { gl } = useThree()
  const formatted = new THREE.WebGLCubeRenderTarget(texture.image.height
    ).fromEquirectangularTexture(gl, texture)
  return (
    <primitive attach='background' object={formatted} />
  )
}


function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas
        shadowMap
        style={{ backgroundColor: "darkgrey" }}
        camera={{ position: [3, 3, 3] }}
      >
        <fog attach="fog" args={["white", 1, 10]} />
        <ambientLight intensity={0.2} />
        <Bulb position={[0, 4, 0]} />
       
        <Suspense fallback={null}>
          <Box position={[0, 2, 0]} />
        </Suspense>
       
        <Suspense fallback={null}>
          <Background />
        </Suspense>
       
        <Floor position={[0, -0.5, 0]} />
        <Orbit />
        <axesHelper args={[5]} />
        <mesh>
          <meshBasicMaterial side={THREE.DoubleSide} />
          <geometry>
            <face3 args={[0, 1, 2]} attachArray="faces" />
            <vector3 attachArray="vertices" />
            <vector3 args={[0, 1, 1]} attachArray="vertices" />
            <vector3 args={[0, 1, -1]} attachArray="vertices" />
          </geometry>
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
