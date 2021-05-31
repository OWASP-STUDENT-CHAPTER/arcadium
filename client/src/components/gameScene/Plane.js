import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PLANE } from "../config/CONSTANTS";

// const myMesh = new THREE.Mesh();
const Plane = ({ initPositionOffset }) => {
  const planeMesh = useRef();
  // useFrame(() => {
  //     boxMesh.current.rotation.y += 0.01;
  // });
  return (
    <mesh ref={planeMesh} position={initPositionOffset}>
      {/* <planeGeometry args={[10, 20, 30]} />
                    <meshPhongMaterial /> */}
      <boxGeometry
        attach="geometry"
        args={[PLANE.width, PLANE.height, PLANE.depth]}
      />
      <meshStandardMaterial
        metalness={0.1}
        attach="material"
        emissive={"#0xFFFF00"}
      />
    </mesh>
  );
};

export default Plane;
