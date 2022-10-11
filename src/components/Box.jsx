import { useFrame, useLoader } from "react-three-fiber"
import { useRef } from "react"
import * as THREE from "three"

const Box = (props) => {
  const ref = useRef()
  // useRef va renvoyer un objet modifiable qui n’impactera pas le cycle de vie du composant.

  const texture = useLoader(THREE.TextureLoader, "/rock.jpg")

  useFrame((state) => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  })

  const handlePointerDown = (e) => {
    // console.log(e)
    e.object.active = true
    if (window.activeMesh) {
      scaleDown(window.activeMesh)
      window.activeMesh.active = false
    }
    window.activeMesh = e.object
    //don't do that in production / or use zustand
  }
  const handlePointerEnter = (e) => {
    e.object.scale.x = 1.5
    e.object.scale.y = 1.5
    e.object.scale.z = 1.5
  }
  const handlePointerLeave = (e) => {
    if (!e.object.active) {
      scaleDown(e.object)
    }
  }
  const scaleDown = (object) => {
    object.scale.x = 1
    object.scale.y = 1
    object.scale.z = 1
  }

  return (
    <mesh
      ref={ref}
      {...props}
      castShadow
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial map={texture} />
    </mesh>
  )
}

export default Box
