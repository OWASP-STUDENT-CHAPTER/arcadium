import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import RefPoint from "../../util/refPoint";

import { PLANE, TILE } from "../../config/CONSTANTS";

import textureFile1 from "./textures/tiles/tile-14-14.jpeg";
import textureFile2 from "./textures/tiles/tile-14-15-15.jpeg";

const Tile = ({ tile }) => {
  let { position, rotation, size, type } = tile;
  const texture = useTexture(textureFile1);
  const texture2 = useLoader(THREE.TextureLoader, textureFile2);

  const tileMesh = useRef();

  if (type === "CORNER") size = [TILE.length, TILE.length, TILE.depth];
  else size = [TILE.length, TILE.width, TILE.depth];

  return (
    <group>
      <mesh ref={tileMesh} position={position} rotation={rotation}>
        <boxBufferGeometry attach="geometry" args={size} />
        <meshStandardMaterial attachArray="material" />
        <meshStandardMaterial attachArray="material" />
        <meshStandardMaterial attachArray="material" />
        <meshStandardMaterial attachArray="material" />
        <meshStandardMaterial map={texture} attachArray="material" />
        <meshStandardMaterial
          map={texture2}
          attachArray="material"
          // metalness={0.1}
          // attach="material"
          // emissive={emissive}
        />
      </mesh>
    </group>
  );
};

const Plane = ({ initPositionOffset, board, children }) => {
  const planeMesh = useRef();
  const centerRef = useRef();

  return (
    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <group ref={planeMesh} position={initPositionOffset}>
        {board.map((t) => (
          <Tile key={t.id} tile={t} />
        ))}
        <group>
          <mesh ref={centerRef} position={[5.5, 5, 0]}>
            {/* <RefPoint position={[0, 0, 1]} /> */}
            <boxGeometry attach="geometry" args={[9, 9, PLANE.depth]} />
            <meshStandardMaterial
              metalness={0.1}
              attach="material"
              emissive="#F4A201"
            />
          </mesh>
          {children}
        </group>
      </group>
    </group>
  );
};

export default Plane;
