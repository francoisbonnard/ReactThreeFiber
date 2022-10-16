import { useThree, extend } from "react-three-fiber"
import { useEffect } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

extend({ OrbitControls })

const OrbitA = () => {
  const { camera, gl } = useThree()
  return (
    <OrbitControls
      attach='orbitControls'
      args={[camera, gl.domElement]}
    />
  )
}

export default OrbitA
