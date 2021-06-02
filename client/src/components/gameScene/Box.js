import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, TransformControls } from "@react-three/drei";

// const myMesh = new THREE.Mesh();
const Box = ({ initPositionOffset, x, y }) => {
  const boxMesh = useRef();
  //   console.log("y", y);
  useFrame(({ clock }) => {
    // console.log(clock);
    let fy = y;
    let fby = boxMesh.current.position.y;
    let fx = x;
    let fbx = boxMesh.current.position.x;
    // let fy = Number(y);
    // let fby = Number(boxMesh.current.position.y);
    // let fx = Number(x);
    // let fbx = Number(boxMesh.current.position.x);

    console.log("fbx,fby", fbx, fby);
    console.log("fx,fy", fx, fy);
    // console.log("y", fy);
    // console.log("boxMesh.current.position.y", fby);
    // let dx = Math.sin(clock.elapsedTime * Math.PI);
    // let dx = Math.abs(Math.sin(clock.elapsedTime));
    // console.log("dx", dx);
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

    // console.log(Math.sin(clock.elapsedTime));
    // else if (fby >= fy) boxMesh.current.position.y -= 0.01;
  });
  const { camera } = useThree();

  return (
    <mesh ref={boxMesh} position={initPositionOffset}>
      {/* <planeGeometry args={[10, 20, 30]} />
                    <meshPhongMaterial /> */}
      {/* <boxGeometry  attach="geometry" args={[1, 2, 3]} /> */}
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial metalness={0.1} attach="material" emissive="red" />
      {/* <TransformControls /> */}
    </mesh>
  );
};

export default Box;
