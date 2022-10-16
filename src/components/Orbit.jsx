import { useThree, extend } from "react-three-fiber"
import { useEffect } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

extend({ OrbitControls })

const Orbit = () => {
  const { camera, gl } = useThree()
  useEffect(() => {
    // useEffect : actions qui peuvent affecter d’autres composants et qui ne peuvent pas être réalisées pendant l’affichage
    const controls = new OrbitControls(camera, gl.domElement, "orbitControls")

    controls.minDistance = 3
    controls.maxDistance = 20

    controls.attach = "orbitControls"

    return () => {
      controls.dispose()
    }
  }, [camera, gl])
  return null
}

export default Orbit
