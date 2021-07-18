import React, { Suspense, useRef } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { camPosOffset } from "../../config/CONSTANTS";
import CaptainAmeraShield from "../cap10.gltf";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Box } from "@react-three/drei";
const Pawn = ({ initPositionOffset, board, color, player, index }) => {
  const boxMesh = useRef();
  const { camera } = useThree();
  // console.log("board   dscfdfkhbdjhfs j n", board, );
  useFrame(() => {
    if (!board || !index) return;

    // console.log("board   dscfdfkhbdjhfs j n", index);
    // console.log("board   dscfdfkhbdjhfs j n", board);
    // return;
    let {
      position: [x, y],
    } = board[index];
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
    // * update camera
    const [camX_Offset, camY_Offset] = camPosOffset;
    // camera.position.x = dx + camX_Offset;
    // camera.position.y = dy + camY_Offset;
  });
  const gltf = useLoader(GLTFLoader, CaptainAmeraShield);
  return (
    <Suspense fallback={<Box />}>
      <primitive
        object={gltf.scene}
        rotation={[1.5, 0, 0]}
        position={[0, 0, 0.5]}
        // scale={[0.5, 0.5, 0.5]}
        scale={[1, 1, 1]}
      />
    </Suspense>
  );
};

export default Pawn;
