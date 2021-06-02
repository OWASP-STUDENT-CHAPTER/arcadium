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
import { PLANE, TILE, camPosOffset } from "../config/CONSTANTS";

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
    fov: 90,
    position: camPosOffset,
    rotation: [0.6, -0.6, -0.6],
  };
  useEffect(() => {
    const {
      position: [x, y],
    } = board[0];
    // console.log("x,y=> ", x, y);
  }, []);
  useEffect(() => {
    // board[i]
    let {
      position: [x, y],
    } = board[index];
    // y -= 3.5;
    // console.log("x,y=> ", x, y);
    setYPos(y);
    setXPos(x);
  }, [index]);

  // useFrame(({ clock }) => {
  //   if (testRef.current && testRef.current.position)
  //     testRef.current.position.y = Math.sin(1 + clock.elapsedTime) * 5;

  // });

  // console.log(camera);

  return (
    <>
      <div>
        <button
          onClick={() => {
            let i = index;

            i += 1;
            // if(i>= )

            i = i % board.length;
            setIndex(i);
          }}>
          MOVEEEEEEEEE
        </button>
      </div>
      <div id="canvas-container" style={{ width: "1200px", height: "1200px" }}>
        <Canvas>
          {/* <OrbitControls /> */}

          <Suspense fallback={null}>
            <group position={[-2, -2, -1]}>
              <ambientLight brightness={2.6} color={"#bdefff"} />

              <Plane tiles={board} initPositionOffset={[-5.5, -5.5, 0]}>
                <Box initPositionOffset={[0, 0, 0]} x={xPos} y={yPos} />
              </Plane>

              <group position={[0, 0, 4]}>
                <PerspectiveCamera makeDefault {...camProps} />
                <RefPoint position={[0, 0, -0.5]} />
              </group>
            </group>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default GameScene;
