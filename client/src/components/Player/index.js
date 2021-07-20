import Pawn from "../common/Pawn";
import PawnModel from "../common/PawnModel";
import { useState, useEffect } from "react";

const Player = ({ board, index, initPositionOffset }) => {
  const [showPropertyPopUp, setShowPropertyPopUp] = useState(false);

  useEffect(() => {
    if (!showPropertyPopUp) return;

    alert("aaa"); //!open popup
  }, [showPropertyPopUp]);
  return (
    // <Pawn
    //   board={board}
    //   index={index}
    //   initPositionOffset={initPositionOffset}
    //   color="red"
    //   player={true}
    // />
    <PawnModel
      showPropertyPopUp={showPropertyPopUp}
      setShowPropertyPopUp={setShowPropertyPopUp}
      board={board}
      index={index}
      initPositionOffset={initPositionOffset}
      color="red"
      player={true}
    />
  );
};

export default Player;
