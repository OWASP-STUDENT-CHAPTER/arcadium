import Pawn from "../common/Pawn";
import PawnModel from "../common/PawnModel";
import { useState, useEffect } from "react";

const Player = (props) => {
  // console.log("modelNumber  2", props.modelNumber);
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
