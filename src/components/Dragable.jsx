import { DragControls } from "three/examples/jsm/controls/DragControls"
import { extend, useThree } from "react-three-fiber"
import { useRef, useEffect, useState } from "react"
extend({ DragControls })

const Dragable = (props) => {
  const groupRef = useRef()
  const controlsRef = useRef()
  const [children, setChildren] = useState([])
  const { camera, gl, scene } = useThree()

  useEffect(() => {
    setChildren(groupRef.current.children)
  }, [])

  useEffect(() => {
    controlsRef.current.addEventListener("hoveron", (e) => {
      console.log(scene)
      console.log(scene.orbitControls)
    })
  }, [children])

  return (
    <group ref={groupRef}>
      {/* DragControls = eventDispatcher  */}
      <dragControls
        ref={controlsRef}
        args={[children, camera, gl.domElement]}
      />
      {props.children}
    </group>
  )
}

export default Dragable
