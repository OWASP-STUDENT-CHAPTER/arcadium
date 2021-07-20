import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { a } from "@react-spring/three";
import { useSpring } from "@react-spring/core";

import RefPoint from "../../util/refPoint";

import { PLANE, TILE } from "../../config/CONSTANTS";

// import textureFile1 from './textures/tiles/tile-14-14.jpeg';
import textureFile2 from "./textures/tiles/tile-14-15-15.jpeg";

const Tile = ({ tile }) => {
  let { position, rotation, size, type, tileImage } = tile;
  const texture = useTexture(tileImage.default);
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

const Plane = ({ initPositionOffset, board, children, dice, index }) => {
  const planeMesh = useRef();
  const centerRef = useRef();
  // const { spring } = useSpring({

  let sprVal = index * 0.1;
  if (index > 10) sprVal += 1;
  console.log(sprVal);
  const { spring } = useSpring({
    spring: sprVal,
    // spring: dice,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });
  // const s = useSpring({
  //   //   // to:async (next)=>{
  //   //   //   await next()
  //   //   // },
  //   rotation: [0, 0, 0],
  //   //   // from: { rotateZ: 0 },
  //   //   // to: { rotateZ: 180 },
  //   //   config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  // });
  const rotation = spring.to((v) => {
    console.log("v", v);
    // if(v>0)
    if (sprVal >= 0 && sprVal < 10 && v <= 39 && v > 10) {
      return sprVal + 40;
    }
    console.log(sprVal);

    console.log("index", index);
    console.log("index*0.05", index * 0.05);

    return v;
  });
  return (
    <a.group
      rotation-z={rotation}
      // rotation-z={s}
      position={[0, 0, 0]}
      //  rotation={[0, 0, 0]}
    >
      <group ref={planeMesh} position={initPositionOffset}>
        {board.map((t) => (
          <Tile key={t.id} tile={t} />
        ))}

        <group>
          <mesh
            ref={centerRef}
            // scale-x={scale}
            // scale-z={scale}
            position={[5.5, 5, 0]}>
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
    </a.group>
  );
};

export default Plane;
