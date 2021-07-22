import Pawn from "../common/Pawn";
import PawnModel from "../common/PawnModel";
import { useState, useEffect } from "react";

const Player = (props) => {
  return (
    // <Pawn
    //   board={board}
    //   index={index}
    //   initPositionOffset={initPositionOffset}
    //   color="red"
    //   player={true}
    // />
    <PawnModel {...props} color="red" player={true} />
  );
};

export default Player;
