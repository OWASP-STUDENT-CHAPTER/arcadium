import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import Box from "./box";
import Plane from "./plane";
import Camera from "../camera/";
import { PLANE } from "../config/CONSTANTS";
// import {ref}
// import { Object3D } from "three";

// const refPoint = ({ position }) => (
//   <mesh position={position}>
//     <sphereBufferGeometry args={[0.1, 30, 30]} attach="geometry" />
//     <meshBasicMaterial color="red" attach="material" />
//   </mesh>
// );

// const myMesh = new THREE.Mesh();
const GameScene = () => {
  // const boxMesh = useRef();
  // useFrame(() => {
  //     boxMesh.current.rotation.y += 0.01;
  // });
  //   const rotationOffset = [-1.3, 0, 0.8];
  const rotationOffset = [0.75, 0.5, 0];
  const initPlanePositionOffset = [0, 0, 0];
  //   const initPlanePositionOffset = [0, 0, 0];
  //   const initBoxPositionOffset = [-2, -2, 0];
  const camProps = {
    fov: 120,
    position: [0, 0, 0],
    // rotation: [0.5, -0.2, -0.2],
  };
  return (
    <div id="canvas-container" style={{ width: "1200px", height: "1200px" }}>
      <Canvas>
        <directionalLight color="#0xffffff" position={[0, 0, 5]} />
        <Plane initPositionOffset={initPlanePositionOffset} />
        {/* <group position={[0, 0, 0]}> */}

        {/* <group position={[-PLANE.height / 2, -PLANE.width / 2, 4]}> */}
        <group position={[-PLANE.width / 2, -PLANE.height / 2, 4]}>
          {/* <group rotation={rotationOffset}> */}
          <PerspectiveCamera makeDefault {...camProps} />
          {/* </group> */}
          <Box initPositionOffset={[0, 0, 0]} />
          {/* <mesh position={[-PLANE.width / 2, -PLANE.height / 2, -4]}> */}
          {/* //   <refPoint position={[0, 0, -0.5]} /> */}
          {/* // <mesh position={position}> */}
          <mesh position={[0, 0, -0.5]}>
            <sphereBufferGeometry args={[0.1, 30, 30]} attach="geometry" />
            <meshBasicMaterial color="red" attach="material" />
          </mesh>
        </group>
        {/* </group> */}
      </Canvas>
    </div>
  );
};

export default GameScene;
