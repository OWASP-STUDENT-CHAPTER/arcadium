import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Box from "./Box";
import Plane from "./Plane";
// import { Object3D } from "three";
function Camera(props) {
    const ref = useRef();
    const { setDefaultCamera } = useThree();
    // Make the camera known to the system
    useEffect(() => void setDefaultCamera(ref.current), []);
    // Update it every frame
    // useFrame(() => ref.current.updateMatrixWorld());
    return <perspectiveCamera ref={ref} {...props} />;
}
// const myMesh = new THREE.Mesh();
const GameScene = () => {
    // const boxMesh = useRef();
    // useFrame(() => {
    //     boxMesh.current.rotation.y += 0.01;
    // });
    const rotationOffset = [-1.3, 0, 0.8];
    const initPlanePositionOffset = [0, 0, -0.25];
    const initBoxPositionOffset = [-2, -2, 0];

    return (
        <div
            id="canvas-container"
            style={{ width: "1200px", height: "1200px" }}>
            <Canvas>
                <Camera />
                {/* <camera /> */}

                {/* <pointLight
                    color="#0xFFFFFF"
                    intensity={3}
                    position={[1, 1, 1]}
                /> */}
                {/* <ambientLight intensity={0.1} />
                 */}
                <directionalLight color="#0xffffff" position={[0, 0, 5]} />
                <object3D rotation={rotationOffset}>
                    <Plane initPositionOffset={initPlanePositionOffset} />

                    {/* <mesh /> */}
                    {/* <PerspectiveCamera makeDefault> */}
                    <Box initPositionOffset={initBoxPositionOffset}>
                        <Camera></Camera>
                    </Box>
                    {/* </PerspectiveCamera> */}
                </object3D>
                {/* <OrbitControls /> */}
            </Canvas>
        </div>
    );
};

export default GameScene;
