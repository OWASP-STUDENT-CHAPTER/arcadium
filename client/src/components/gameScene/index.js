import { useState, useEffect, Suspense, useMemo, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

import Player from '../Player';
import Opponent from '../Opponent';

import { PLANE, camPosOffset } from '../../config/CONSTANTS';

import { AuthContext } from '../../context/authContext.js';
import { GameContext } from '../../context/gameContext';

import Plane from './plane.js';

const GameScene = ({ socket }) => {
  const { teams, updatePos, board } = useContext(GameContext);
  const { team } = useContext(AuthContext);

  const [index, setIndex] = useState(team.game.posIndex);
  const [dice, setDice] = useState(0);
  const [canMove, setCanMove] = useState(true);

  // const rotationOffset = [0.75, 0.5, 0];
  // const initPlanePositionOffset = [0, 0, 0];
  //   const initPlanePositionOffset = [0, 0, 0];
  //   const initBoxPositionOffset = [-2, -2, 0];
  const camProps = {
    fov: 90,
    position: camPosOffset,
    rotation: [0.6, -0.52, -0.6],
  };

  useEffect(() => {
    if (!socket) return;
    socket.removeAllListeners('player_move'); //!
    socket.removeAllListeners('allow_moving'); //!
    socket.on('player_move', (data) => {
      console.log('oponnent move', data);
      updatePos(data.teamId, data.pos);
    });

    socket.on('allow_moving', () => {
      setCanMove(true); //! change
    });
  }, [socket, teams]);

  const movePlayer = () => {
    let i = index;
    const d = Math.floor(Math.random() * 6) + 1;

    i += d;
    i = i % board.length;
    setIndex(i);
    setDice(d);
    setCanMove(false);

    socket.emit('move', {
      pos: i,
    });
  };

  return (
    <>
      {/* <div>
        <button disabled={!canMove} onClick={movePlayer}>
          MOVEEEEEEEEE
        </button>
        <h4>dice: {dice}</h4>
        <h4>pos: {index}</h4>
      </div> */}
      <div id='canvas-container' style={{ width: '500px', height: '500px' }}>
        <Canvas>
          <Suspense fallback={null}>
            <group position={[-2, -2, -1]}>
              <ambientLight brightness={2.6} color={'#bdefff'} />

              <Plane board={board} initPositionOffset={[-5.5, -5.5, 0]}>
                <Player
                  board={board}
                  index={index}
                  initPositionOffset={[0, 0, PLANE.depth]}
                />
                {teams
                  .filter((t) => t._id !== team._id)
                  .map((t) => (
                    <Opponent board={board} key={t._id} pos={t.game.posIndex} />
                  ))}
              </Plane>
              <group position={[0, 0, 4]}>
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
