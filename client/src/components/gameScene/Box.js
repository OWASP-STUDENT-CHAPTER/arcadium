import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  TransformControls,
} from "@react-three/drei";
import * as THREE from "three";
import { camPosOffset } from "../config/CONSTANTS";

// const myMesh = new THREE.Mesh();
const Box = ({ initPositionOffset, x, y, color }) => {
  const boxMesh = useRef();
  //   console.log("y", y);
  const { camera } = useThree();

  useFrame(({ clock }) => {
    // console.log(clock);
    let fy = y;
    let fby = boxMesh.current.position.y;
    let fx = x;
    let fbx = boxMesh.current.position.x;

    let dx = boxMesh.current.position.x,
      dy = boxMesh.current.position.y;
    if (fby < fy) {
      dy += 0.05;
    }
    if (fby > fy) {
      dy -= 0.05;
    }

    if (fbx < fx) {
      dx += 0.05;
    }
    if (fbx > fx) {
      dx -= 0.05;
    }

    if (Math.abs(y - dy) < 0.05) dy = fy;
    if (Math.abs(x - dx) < 0.05) dx = fx;
    boxMesh.current.position.y = dy;
    boxMesh.current.position.x = dx;
    // const oorginal = camera.position;
    // const offsetX = -8,
    //   offsetY = -6;

    const [camX_Offset, camY_Offset] = camPosOffset;
    // camera.position.x = dx + camX_Offset;
    // camera.position.y = dy + camY_Offset;
    // camera.rotation.x = 0.6;
    // camera.rotation.y = -0.6;
    // camera.rotation.z = -0.6;
    // console.log(Math.sin(clock.elapsedTime));
    // else if (fby >= fy) boxMesh.current.position.y -= 0.01;
  });
  // useEffect(() => {
  //   console.log(camera.rotation);

  //   camera.rotateOnAxis(new THREE.Vector3(0, 0, 0.5), -0.5);
  //   // camera.rotateOnAxis(new THREE.Vector3(0, 0, 0.5), -0.5);
  // }, [y]);
  // useEffect(() => {
  //   console.log(camera.rotation);
  //   // camera.rotateX(5);
  //   // camera.rotateX(-5);
  //   // camera.rotateY(-0.1);
  //   // camera.rotateY(-5);
  //   // camera.rotateOnAxis(new THREE.Vector3(0, 0.5, 0.5), -0.5);
  //   // camera.rotateOnAxis(new THREE.Vector3(0, 0, 0.5), -0.5);
  // }, [y]);

  // useEffect(() => {
  //   camera.translateOnAxis(new THREE.Vector3(x % 4, -(y % 4) * 0.1, 0.5), -0.5);
  // }, [x, y]);

  return (
    // <TransformControls camera={camera}>
    <mesh ref={boxMesh} position={initPositionOffset}>
      {/* <planeGeometry args={[10, 20, 30]} />
      
                    <meshPhongMaterial /> */}
      {/* <boxGeometry  attach="geometry" args={[1, 2, 3]} /> */}
      {/* <OrbitControls
        // position={[-7, -7, 0]}
        // rotation={[0.6, -0.52, -0.6]}
        camera={camera}
      /> */}
      <boxGeometry args={[0.5, 0.5, 0.5]} />

      <meshStandardMaterial
        metalness={0.1}
        attach="material"
        emissive={color}
      />
    </mesh>
  );
};

export default Box;
