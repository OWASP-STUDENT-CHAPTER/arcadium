import { useState, useEffect, Suspense, useMemo, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import Player from "../Player";
import Opponent from "../Opponent";
// import CaptainAmeraShield from "../cap10.gltf";
import { PLANE, camPosOffset } from "../../config/CONSTANTS";

import { AuthContext } from "../../context/authContext.js";
import { GameContext } from "../../context/gameContext";
// import CameraControls from "../camera/orbit";
import Plane from "./plane.js";

//
///
// function Duck() {
//   console.log("a");
//   const gltf = useLoader(GLTFLoader, CaptainAmeraShield);
//   return (
//     <primitive
//       object={gltf.scene}
//       rotation={[1.5, 0, 0]}
//       position={[0, 0, 0.5]}
//       // scale={[0.5, 0.5, 0.5]}
//       scale={[1, 1, 1]}
//     />
//   );
// }
///
//

const GameScene = ({ socket, dice, setDice, setCanMove }) => {
  const {
    teams,
    updatePos,
    board,
    properties,
    isAnimating,
    setIsAnimating,
    propertyModel,
    index,
    setIndex,
    setOwnershipMap,
  } = useContext(GameContext);
  const { team } = useContext(AuthContext);

  useEffect(() => {
    setIndex(team.game.posIndex);
  }, [team]);

  useEffect(() => {
    if (isAnimating == false && index != 0) propertyModel.setShow(true);
    // alert(`${properties[index].name}`); //!open popup
  }, [isAnimating]);

  // const [camRot, setCamRot] = useState([0, 0, 0]);
  // const rotationOffset = [0.75, 0.5, 0];
  // const initPlanePositionOffset = [0, 0, 0];
  //   const initPlanePositionOffset = [0, 0, 0];
  //   const initBoxPositionOffset = [-2, -2, 0];
  const camProps = {
    fov: 90,
    // fov: 500,
    position: camPosOffset,
    rotation: [0.6, -0.52, -0.6],
    // rotation: [0, 0, 0],
  };

  useEffect(() => {
    if (!socket) return;
    socket.removeAllListeners("player_move"); //!
    socket.removeAllListeners("allow_moving"); //!
    socket.removeAllListeners("update_ownershipMap"); //!
    socket.on("player_move", (data) => {
      console.log("oponnent move", data);
      updatePos(data.teamId, data.pos);
    });
    socket.on("update_ownershipMap", ({ ownershipMap }) => {
      console.log("update_ownershipMap ", { ownershipMap });
      setOwnershipMap(ownershipMap);
    });

    socket.on("allow_moving", () => {
      setCanMove(true); //! change
    });
  }, [socket, teams]);
  const movePlayer = () => {
    if (!socket) return;
    if (dice == 0) return;
    console.log("dice in effect", dice);
    let i = index;
    // const d = Math.floor(Math.random() * 6) + 1;

    i += dice;
    i = i % board.length;
    setIndex(i);
    // const { spring } = useSpring({
    //   spring: active,
    //   config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
    // });
    // setCamRot([0, 0, camRot[2] + 0.1 * d]);
    // setDice(d);
    setCanMove(false);
    console.log("moving");
    socket.emit("move", {
      pos: i,
    });
  };

  useEffect(movePlayer, [dice, socket]);
  // const scale = spring.to([0, 1], [1, 5]);
  // const rotation = spring.to([0, 1], [0, Math.PI]);
  // const color = spring.to([0, 1], ["#6246ea", "#e45858"]);
  return (
    <>
      {/* <div>
        <button disabled={!canMove} onClick={movePlayer}>
          MOVEEEEEEEEE
        </button>
        <h4>dice: {dice}</h4>
        <h4>pos: {index}</h4>
      </div> */}
      <div
        id="canvas-container"
        style={{
          margin: "auto",

          width: "900px",
          height: "900px",
        }}>
        <Canvas>
          <Suspense fallback={null}>
            <group position={[-2, -2, -1]}>
              <ambientLight brightness={2.6} color={"#bdefff"} />

              <Plane
                // rotation={camRot}
                index={index}
                board={board}
                dice={dice}
                initPositionOffset={[-5.5, -5.5, 0]}>
                {/* <captainA /> */}
                {/* <Suspense fallback={<Box />}>
                  <Duck />
                </Suspense> */}

                <Player
                  board={board}
                  index={index}
                  isAnimating={isAnimating}
                  setIsAnimating={setIsAnimating}
                  properties={properties}
                  initPositionOffset={[0, 0, PLANE.depth]}
                />
                {teams
                  .filter((t) => t._id !== team._id)
                  .map((t) => (
                    <Opponent board={board} key={t._id} pos={t.game.posIndex} />
                  ))}
              </Plane>
              <group position={[0, 0, 4]}>
                {/* <CameraControls /> */}
                {/* <OrbitControls /> */}

                {/* <directionalLight
                  intensity={2}
                  // decay={2}
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, 0, 0]}
                /> */}

                <pointLight
                  intensity={3}
                  // decay={2}
                  // rotation={[-Math.PI / 2, 0, 0]}
                  // position={[-2, 0, -2]}
                  position={[-5, -5, 0]}
                />
                <PerspectiveCamera makeDefault {...camProps} />
              </group>
            </group>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default GameScene;
