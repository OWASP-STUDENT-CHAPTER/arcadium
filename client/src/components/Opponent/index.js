import Pawn from "../common/Pawn";
import { PLANE } from "../../config/CONSTANTS";

const Opponent = ({ board, pos }) => {
  return (
    <Pawn
      board={board}
      index={pos}
      player={false}
      color="#98f5ff"
      initPositionOffset={[0, 0, PLANE.depth]}
    />
  );
};

export default Opponent;
