import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { camPosOffset } from "../../config/CONSTANTS";

const Pawn = ({ initPositionOffset, board, color, player, index }) => {
  const boxMesh = useRef();
  const { camera } = useThree();
  useFrame(() => {
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

  // useEffect(() => {
  //   const { position } = board[index];
  //   console.log("useEffect board", position);
  // }, [index]);

  return (
    <mesh ref={boxMesh} position={initPositionOffset}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial metalness={0.1} attach="material" color={color} />
    </mesh>
  );
};

export default Pawn;
