import React from "react";
import { PropTypes } from "prop-types";
import DiceContainer from "./DiceContainer";

const ReactDice = React.forwardRef((props, ref) => {
  const totalCb = (total, diceValues) => {
    // console.log('total', total);
    if (props.disabled) {
      return alert("cant");
    }
    props.rollDone(total, diceValues);
  };

  return <DiceContainer {...props} totalCb={totalCb} ref={ref} />;
});

ReactDice.propTypes = {
  defaultRoll: PropTypes.number,
  dieSize: PropTypes.number,
  disableIndividual: PropTypes.bool,
  dotColor: PropTypes.string,
  faceColor: PropTypes.string,
  margin: PropTypes.number,
  numDice: PropTypes.number,
  outline: PropTypes.bool,
  outlineColor: PropTypes.string,
  rollDone: PropTypes.func,
  rollTime: PropTypes.number,
  sides: PropTypes.number,
};

ReactDice.defaultProps = {
  defaultRoll: 4,
  dieSize: 60,
  disableIndividual: false,
  dotColor: "#111",
  faceColor: "#fff",
  margin: 15,
  numDice: 1,
  outline: false,
  outlineColor: "#000000",
  rollDone: () => null,
  rollTime: 1,
  sides: 6,
};

export default ReactDice;
