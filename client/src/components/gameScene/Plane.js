import React, { useState, useEffect, useRef, Suspense } from "react";
import { useLoader } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { PLANE, TILE } from "../config/CONSTANTS";
// import img from "../../util/tile-14-14.png";
import { BoxGeometry, EdgesGeometry } from "three";
import * as THREE from "three";
import genBoard from "../../util/genBoard";
import Dice from "../dice/dice";

// import t1 from "../dice/textures/t6.jpeg";
import t1 from "./tiles/tile-14-14.jpeg";
import t2 from "./tiles/tile-14-15-15.jpeg";
// import t6 from "";
// const myMesh = new THREE.Mesh();
// import img from "../../util/tile-14-14.png";

const numTilesInRow = 9;
const cornerSide = 0;

// import z from ''
const Tile = ({ tile }) => {
  // const texture1 = useLoader(THREE.TextureLoader, t1);
  const texture = useTexture(t1);
  const texture2 = useLoader(THREE.TextureLoader, t2);
  let { position, emissive, rotation, size, type, id } = tile;

  // let texture = id % 2 ? texture1 : texture2;
  // console.log(texture2);
  const tileMesh = useRef();
  if (type === "corner") size = [TILE.length, TILE.length, TILE.depth];
  else size = [TILE.length, TILE.width, TILE.depth];
  return (
    <group>
      <mesh ref={tileMesh} position={position} rotation={rotation}>
        {/* <mesh ref={tileMesh} position={position} rotation={[1, -1, 1]}> */}
        <boxBufferGeometry attach="geometry" args={size} />
        <meshStandardMaterial
          metalness={0.1}
          attachArray="material"
          // attach="material"
          // emissive={emissive}
        />
        <meshStandardMaterial
          metalness={0.1}
          attachArray="material"
          // attach="material"
          // emissive={emissive}
        />
        <meshStandardMaterial
          metalness={0.1}
          attachArray="material"
          // attach="material"
          // emissive={emissive}
        />
        <meshStandardMaterial
          metalness={0.1}
          attachArray="material"
          // attach="material"
          // emissive={emissive}
        />
        <meshStandardMaterial
          map={texture}
          metalness={0.1}
          attachArray="material"
          // attach="material"
          // emissive={emissive}
        />
      </mesh>
    </group>
  );
};

// const Tile = ({ tile: { position } }) => {
//   return <Dice p={position} />;
// };

const Plane = ({ initPositionOffset, tiles, children }) => {
  const planeMesh = useRef();
  const centerRef = useRef();
  // const tiles = 11;
  return (
    <group ref={planeMesh} position={initPositionOffset}>
      {tiles.map((t) => (
        <Tile key={t.id} tile={t} />
      ))}

      <group>
        <mesh ref={centerRef} position={[5.5, 5, 0]}>
          <boxGeometry
            attach="geometry"
            // args={[tileLength, tileWidth, tileDepth, ,]}
            args={[9, 9, PLANE.depth]}
          />
          <meshStandardMaterial
            metalness={0.1}
            attach="material"
            emissive="#F4A201"
          />
        </mesh>
        {children}
      </group>
    </group>
  );
};

export default Plane;
