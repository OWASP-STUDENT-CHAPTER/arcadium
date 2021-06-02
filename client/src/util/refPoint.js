const RefPoint = ({ position }) => (
  <mesh position={position}>
    <sphereBufferGeometry args={[0.05, 30, 30]} attach="geometry" />
    <meshBasicMaterial color="red" attach="material" />
  </mesh>
);

export default RefPoint;
