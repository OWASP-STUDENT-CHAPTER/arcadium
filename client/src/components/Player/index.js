import Pawn from "../common/Pawn";
// import PawnModel from "../common/PawnModel";

const Player = ({ board, index, initPositionOffset }) => {
  return (
    // <Pawn
    //   board={board}
    //   index={index}
    //   initPositionOffset={initPositionOffset}
    //   color="red"
    //   player={true}
    // />
    <PawnModel
      board={board}
      index={index}
      initPositionOffset={initPositionOffset}
      color="red"
      player={true}
    />
  );
};

export default Player;
