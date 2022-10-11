import { DragControls } from "three/examples/jsm/controls/DragControls"
import { extend, useThree } from "react-three-fiber"
import { useRef, useEffect, useState } from "react"
extend({ DragControls })

const Dragable = (props) => {
  const groupRef = useRef()
  const [children, setChildren] = useState([])
  const { camera, gl } = useThree()

  useEffect(() => {
    setChildren(groupRef.current.children)
  }, [])

  return (
    <group ref={groupRef}>
      {/* DragControls = eventDispatcher  */}
      <dragControls args={[children, camera, gl.domElement]} />
      {props.children}
    </group>
  )
}

export default Dragable
