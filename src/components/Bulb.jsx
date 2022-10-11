const Bulb = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.2, 16, 16]} />
      <meshPhongMaterial emissive={"yellow"} />
    </mesh>
  )
}
export default Bulb
