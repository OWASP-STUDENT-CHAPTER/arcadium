import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import Box from "./box";
import Dice from "../dice/dice";
import Plane from "./plane";
import PlaneORG from "./plane_o";
import Camera from "../camera/";
import { PLANE } from "../config/CONSTANTS";
// import {ref}
// import { Object3D } from "three";
import RefPoint from "../../util/refPoint";
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
    // rotation: [1, 0, 0],
  };
  return (
    <div id="canvas-container" style={{ width: "1200px", height: "1200px" }}>
      <Canvas>
        <Suspense fallback={null}>
          <Dice />
          {/* <group position={[-5, -5, 0]}> */}
          <group position={[-2, -2, -1]}>
            {/* <directionalLight color="#0xffffff" position={[-5.5, -5.5, 0]} />
            <directionalLight color="#0xffffff" position={[-5.5, -5.5, -5.5]} /> */}
            {/* <directionalLight color="#0xffffff" position={[0, -5.5, 5.5]} />
            <directionalLight color="#0xffffff" position={[-5.5, 0, 5.5]} />
             */}
            <ambientLight brightness={2.6} color={"#bdefff"} />
            {/* <directionalLight color="#0xffffff" position={[-5.5, -5.5, 0]} />
            <directionalLight color="#0xffffff" position={[-5.5, -5.5, 0]} />
            <directionalLight color="#0xffffff" position={[-5.5, -5.5, 0]} /> */}
            {/* <pointLight
              intensity={20}
              color="#0xffffff"
              position={[-5.5, -5.5, 0]}
            /> */}
            <Plane initPositionOffset={[-5.5, -5.5, 0]} />
            {/* <PlaneORG initPositionOffset={initPlanePositionOffset} /> */}
            {/* <group position={[0, 0, 0]}> */}

            {/* <group position={[-PLANE.height / 2, -PLANE.width / 2, 4]}> */}
            {/* <group position={[-PLANE.width / 2, -PLANE.height / 2, 4]}> */}
            <group position={[0, 0, 4]}>
              {/* <group rotation={rotationOffset}> */}
              <PerspectiveCamera makeDefault {...camProps} />
              {/* </group> */}
              <Box initPositionOffset={[0, 0, 0]} />
              {/* <mesh position={[-PLANE.width / 2, -PLANE.height / 2, -4]}> */}
              <RefPoint position={[0, 0, -0.5]} />
              {/* // <mesh position={position}> */}
              {/* <mesh position={[0, 0, -0.5]}>
            <sphereBufferGeometry args={[0.1, 30, 30]} attach="geometry" />
            <meshBasicMaterial color="red" attach="material" />
          </mesh> */}
            </group>
            {/* </group> */}
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GameScene;
