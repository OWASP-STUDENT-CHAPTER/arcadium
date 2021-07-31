import React, { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { camPosOffset } from "../../config/CONSTANTS";

import MODELS from "../../config/MODELS";
import Shield from "../Models/shield";

import { Box } from "@react-three/drei";

const Pawn = ({
  modelNumber,
  board,
  player,
  index,
  isAnimating,
  setIsAnimating,
}) => {
  const boxMesh = useRef();
  useFrame(() => {
    if (!boxMesh.current) return;
    let {
      position: [x, y],
    } = board[index];
    // console.log("sad", MODELS[modelNumber]);
    let fy = y;
    let fby = boxMesh.current.position.y;
    let fx = x;
    let fbx = boxMesh.current.position.x;

    let dx = boxMesh.current.position.x,
      dy = boxMesh.current.position.y;
    if ((index > 0 && index < 10) || (index > 20 && index < 30)) {
      if (fbx < fx) {
        dx += 0.05;
      }
      if (fbx > fx) {
        dx -= 0.05;
      }
      if (Math.abs(x - dx) < 0.05) {
        dx = fx;
        if (fby < fy) {
          dy += 0.05;
        }
        if (fby > fy) {
          dy -= 0.05;
        }
      }
      if (Math.abs(y - dy) < 0.05) {
        dy = fy;
      }
      //
    } else {
      if (fby < fy) {
        dy += 0.05;
      }
      if (fby > fy) {
        dy -= 0.05;
      }
      if (Math.abs(y - dy) < 0.05) {
        dy = fy;
        if (fbx < fx) {
          dx += 0.05;
        }
        if (fbx > fx) {
          dx -= 0.05;
        }
      }
      if (Math.abs(x - dx) < 0.05) {
        dx = fx;
      }
      //
    }

    boxMesh.current.position.y = dy;
    boxMesh.current.position.x = dx;

    if (!player) return;
    if (dy == y && x == dx) {
      if (isAnimating == true) setTimeout(() => setIsAnimating(false), 1000);
    } else setIsAnimating(true);
    // * update camera
    const [camX_Offset, camY_Offset] = camPosOffset;
  });
  if (!modelNumber || modelNumber == -1) modelNumber = 1;

  const rotation = MODELS[modelNumber].getRotation(index);

  const Model = MODELS[modelNumber] ? MODELS[modelNumber].comp : Shield;
  // alert(modelNumber);
  // console.log("model num", MODELS[modelNumber]);
  // const
  return (
    <Suspense fallback={<Box />}>
      <Model
        meshRef={boxMesh}
        // rotation={MODELS[modelNumber].rotation}
        // position={[0, 0, 0.5]}
        // scale={[0.15, 0.15, 0.15]}
        rotation={rotation}
        {...MODELS[modelNumber].props} //! fix
      />
    </Suspense>
  );
};

export default Pawn;
