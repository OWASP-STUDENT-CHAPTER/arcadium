import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  TransformControls,
} from "@react-three/drei";
import * as THREE from "three";
import { camPosOffset } from "../config/CONSTANTS";
import { useSpring, a } from "@react-spring/three";

// const myMesh = new THREE.Mesh();
const Player = ({ initPositionOffset, x, y, color, player, index, board }) => {
  const boxMesh = useRef();
  const { camera } = useThree();

  useSpring();

  return (
    <a.mesh ref={boxMesh} position={initPositionOffset}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial metalness={0.1} attach="material" color={color} />
    </a.mesh>
  );
};

export default Player;
