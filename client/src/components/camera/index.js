import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

function Camera(props) {
  const ref = useRef();
  const set = useThree((state) => state.set);
  // Make the camera known to the system
  useEffect(() => void set({ camera: ref.current }), []);
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld());
  return <perspectiveCamera ref={ref} {...props} />;
}

export default Camera;
