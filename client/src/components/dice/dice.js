import React, { useState, useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

import t1 from "./textures/t1.jpeg";
import t2 from "./textures/t2.jpeg";
import t3 from "./textures/t3.jpeg";
import t4 from "./textures/t4.jpeg";
import t5 from "./textures/t5.jpeg";
import t6 from "./textures/t6.jpeg";

const Dice = ({ p }) => {
  const mesh = useRef();
  const texture_1 = useLoader(THREE.TextureLoader, t1);
  const texture_2 = useLoader(THREE.TextureLoader, t2);
  // const texture_3 = useLoader(THREE.TextureLoader, t3);
  const texture_3 = useTexture(t3);
  // const texture_3 = useLoader(THREE.TextureLoader, t3);
  const texture_4 = useTexture(t4);
  // const texture_4 = useLoader(THREE.TextureLoader, t4);
  const texture_5 = useLoader(THREE.TextureLoader, t5);
  const texture_6 = useLoader(THREE.TextureLoader, t6);

  return (
    <mesh ref={mesh} position={p} rotation={[1.3, 0, 1.5]}>
      {/* // <mesh ref={mesh} position={p}> */}
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial map={texture_1} attachArray="material" />
      <meshStandardMaterial map={texture_2} attachArray="material" />
      <meshStandardMaterial map={texture_3} attachArray="material" />
      <meshStandardMaterial map={texture_4} attachArray="material" />
      <meshStandardMaterial map={texture_5} attachArray="material" />
      <meshStandardMaterial map={texture_6} attachArray="material" />
    </mesh>
  );
};

export default Dice;
