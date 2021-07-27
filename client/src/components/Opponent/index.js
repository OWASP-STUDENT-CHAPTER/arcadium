import Pawn from "../common/Pawn";
import { PLANE } from "../../config/CONSTANTS";

import PawnModel from "../common/PawnModel";

const Opponent = (props) => {
  // console.log("opp ", props.modelNumber);
  return (
    // <Pawn
    //   board={board}
    //   index={pos}
    //   player={false}
    //   color="#98f5ff"
    //   initPositionOffset={[0, 0, PLANE.depth]}
    // />
    <PawnModel {...props} color="#98f5ff" player={false} />
    // <Pawn
    //   board={board}
    //   index={pos}
    //   player={false}
    //   color="#98f5ff"
    //   initPositionOffset={[0, 0, PLANE.depth]}
    // />
  );
};

export default Opponent;
