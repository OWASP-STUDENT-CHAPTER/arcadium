import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, TransformControls } from "@react-three/drei";

// const myMesh = new THREE.Mesh();
const Box = ({ initPositionOffset }) => {
    const boxMesh = useRef();
    useFrame(() => {
        boxMesh.current.position.y += 0.01;
    });
    const { camera } = useThree();

    return (
        <mesh ref={boxMesh} position={initPositionOffset}>
            {/* <planeGeometry args={[10, 20, 30]} />
                    <meshPhongMaterial /> */}
            {/* <boxGeometry  attach="geometry" args={[1, 2, 3]} /> */}
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial
                metalness={0.1}
                attach="material"
                emissive="red"
            />
            {/* <TransformControls /> */}
        </mesh>
    );
};

export default Box;
