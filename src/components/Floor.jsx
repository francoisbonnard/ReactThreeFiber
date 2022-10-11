const Floor = (props) => {
  return (
    <mesh
      {...props}
      receiveShadow
    >
      <boxBufferGeometry args={[5, 1, 5]} />
      <meshPhysicalMaterial />
    </mesh>
  )
}

export default Floor
