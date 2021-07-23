import React from 'react';
import Dice from '../dice/dice';

import ReactDice from '../dice/ReactDice';

const RollDice = ({ socket, dice, setDice, canMove }) => {
  console.log('canMove', canMove);
  return (
    <div className='dice-container'>
      {/* <div className='dice'></div> */}
      {/* <button className='roll-dice' disabled={!canMove} onClick={movePlayer}>
        Roll
      </button> */}
      {/* <ReactDice disabled={!canMove} onClick={movePlayer} /> */}
      {canMove && (
        <ReactDice
          disabled={!canMove}
          rollDone={(diceVal) => {
            // const d = Math.floor(Math.random() * 6) + 1;
            // setDice(3);

            setDice(diceVal);
          }}
        />
      )}
      {/* <Player
        board={board}
        index={index}
        initPositionOffset={[0, 0, PLANE.depth]}
      /> */}
      {/* {teams
        .filter((t) => t._id !== team._id)
        .map((t) => (
          <Opponent board={board} key={t._id} pos={t.game.posIndex} />
        ))} */}
    </div>
  );
};

export default RollDice;
