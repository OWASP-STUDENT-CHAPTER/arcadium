import Pawn from "../common/Pawn";

const Player = ({ board, index, initPositionOffset }) => {
  return (
    <Pawn
      board={board}
      index={index}
      initPositionOffset={initPositionOffset}
      color="red"
      player={true}
    />
  );
};

export default Player;