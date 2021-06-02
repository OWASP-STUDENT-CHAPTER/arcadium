import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree, useResource } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrbitControls,
  useCamera,
  CubeCamera,
  TransformControls,
} from "@react-three/drei";
import Box from "./box";
import Dice from "../dice/dice";
import Plane from "./plane";
import PlaneORG from "./plane_o";
import Camera from "../camera/";
// import { PLANE } from "../config/CONSTANTS";
import TEST_CUBE from "../camera/cubeCamera";
import genBoard from "../../util/genBoard";
import { PLANE, TILE } from "../config/CONSTANTS";

// import {ref}
// import { Object3D } from "three";
import RefPoint from "../../util/refPoint";
// const myMesh = new THREE.Mesh();
const GameScene = () => {
  const camRef = useRef();
  const testRef = useRef();
  const [yPos, setYPos] = useState(-2);
  const [xPos, setXPos] = useState(-2);
  const [index, setIndex] = useState(0);
  // const myCamera = useCamera();
  const [board] = useState(genBoard(TILE.length, TILE.width, TILE.depth));
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
    position: [0, 0, 3],
    // rotation: [1, 0, 0],
  };
  useEffect(() => {
    const {
      position: [x, y],
    } = board[0];
    console.log("x,y=> ", x, y);
  }, []);
  useEffect(() => {
    // board[i]
    let {
      position: [x, y],
    } = board[index];
    // y -= 3.5;
    console.log("x,y=> ", x, y);
    setYPos(y);
    setXPos(x);
  }, [index]);

  // useFrame(({ clock }) => {
  //   if (testRef.current && testRef.current.position)
  //     testRef.current.position.y = Math.sin(1 + clock.elapsedTime) * 5;
  // });
  return (
    <>
      <div>
        {/* <input value={y} onChange={(e) => setY(e.target.value)} /> */}
        <button
          onClick={() => {
            let i = index;
            // if (i >= ) i 0;
            // else i++;
            i += 1;
            i = i % board.length;
            setIndex(i);
          }}>
          MOVEEEEEEEEE
        </button>
      </div>
      <div id="canvas-container" style={{ width: "1200px", height: "1200px" }}>
        <Canvas>
          <Suspense fallback={null}>
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
              <Plane tiles={board} initPositionOffset={[-5.5, -5.5, 0]}>
                {/* <Box initPositionOffset={[-2.5, -2.7, 0]} y={yPos} /> */}
                <Box initPositionOffset={[0, 0, 0]} x={xPos} y={yPos} />
              </Plane>
              {/* <PlaneORG initPositionOffset={initPlanePositionOffset} /> */}
              {/* <group position={[0, 0, 0]}> */}

              {/* <group position={[-PLANE.height / 2, -PLANE.width / 2, 4]}> */}
              {/* <group position={[-PLANE.width / 2, -PLANE.height / 2, 4]}> */}
              <group position={[0, 0, 4]}>
                {/* <group rotation={rotationOffset}> */}
                {/* <PerspectiveCamera makeDefault {...camProps} ref={camRef} /> */}
                <PerspectiveCamera makeDefault {...camProps} />
                {/* 
              {/*
               */}
                {/* <PerspectiveCamera ref={myCamera} makeDefault {...camProps} /> */}
                {/* <camera ref={camRef} /> */}
                {/* <TransformControls camera={camRef.current} /> */}
                {/* </group> */}
                {/* <TEST_CUBE />
                 */}
                {/* <OrbitControls /> */}
                {/* <CubeCamera>
                {/*
                */}
                {/* <Box initPositionOffset={[-2.5, -2.7, 0]} y={yPos} /> */}
                {/* {(texture) => <Dice />} */}
                {/* {(texture) => (
                  <mesh ref={testRef}>
                    <sphereBufferGeometry args={[5, 64, 64]} />
                    <meshStandardMaterial
                      roughness={0}
                      metalness={1}
                      // envMap={texture}
                    />
                  </mesh>
                )} */}
                {/* </CubeCamera> */}
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
    </>
  );
};

export default GameScene;
