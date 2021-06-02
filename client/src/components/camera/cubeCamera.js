import * as THREE from "three";
import ReactDOM from "react-dom";
import React, { useRef, useMemo } from "react";
import { Canvas, createPortal, useFrame } from "react-three-fiber";
import {
  PerspectiveCamera,
  OrbitControls,
  TorusKnot,
  Box,
} from "@react-three/drei";
// import "./styles.css";

// function SpinningThing() {
//   const mesh = useRef();
//   useFrame(
//     () =>
//       (mesh.current.rotation.x =
//         mesh.current.rotation.y =
//         mesh.current.rotation.z +=
//           0.01)
//   );
//   return (
//     <TorusKnot ref={mesh} args={[1, 0.4, 100, 64]}>
//       <meshNormalMaterial attach="material" />
//     </TorusKnot>
//   );
// }

function TEST_CUBE() {
  const cam = useRef();
  const [scene, target] = useMemo(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("orange");
    const target = new THREE.WebGLMultisampleRenderTarget(1024, 1024, {
      format: THREE.RGBFormat,
      stencilBuffer: false,
    });
    target.samples = 8;
    return [scene, target];
  }, []);

  // useFrame((state) => {
  //   cam.current.position.z =
  //     5 + Math.sin(state.clock.getElapsedTime() * 1.5) * 2;
  //   state.gl.setRenderTarget(target);
  //   state.gl.render(scene, cam.current);
  //   state.gl.setRenderTarget(null);
  // });

  return (
    <>
      <PerspectiveCamera ref={cam} position={[-2, -2, 0]} />
      {/* {createPortal(<SpinningThing />, scene)} */}
      {/* <Box args={[2, 2, 2]}>
        <meshStandardMaterial attach="material" emissive="red" />
      </Box> */}
    </>
  );
}

export default TEST_CUBE;
