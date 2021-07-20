import React from 'react';
import Dice from '../dice/dice';

import '../../assets/css/Cards.css';
import { useState, useEffect, useMemo, useContext } from 'react';

import Player from '../Player/index';
import Opponent from '../Opponent/index';

import { PLANE } from '../../config/CONSTANTS';

import { AuthContext } from '../../context/authContext.js';
import { GameContext } from '../../context/gameContext';
import Plane from '../gameScene/plane';
import ReactDice from '../dice/ReactDice';

const RollDice = ({ socket }) => {
  const { teams, updatePos, board } = useContext(GameContext);
  const { team } = useContext(AuthContext);

  const [index, setIndex] = useState(team.game.posIndex);
  const [dice, setDice] = useState(0);
  const [canMove, setCanMove] = useState(true);

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
    <div className='dice-container'>
      {/* <div className='dice'></div> */}
      {/* <button className='roll-dice' disabled={!canMove} onClick={movePlayer}>
        Roll
      </button> */}
      <ReactDice disabled={!canMove} onClick={movePlayer} />
      {/* <Player
        board={board}
        index={index}
        initPositionOffset={[0, 0, PLANE.depth]}
      /> */}
      {teams
        .filter((t) => t._id !== team._id)
        .map((t) => (
          <Opponent board={board} key={t._id} pos={t.game.posIndex} />
        ))}
    </div>
  );
};

export default RollDice;
