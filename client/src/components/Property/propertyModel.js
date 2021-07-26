import { useContext, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { AuthContext } from "../../context/authContext";
import { GameContext } from "../../context/gameContext";
import axios from "../../util/axios";
import classes from "./propertyModel.module.css";

const PropertyModel = ({ socket }) => {
  const { propertyModel, properties, index, ownershipMap, teams } =
    useContext(GameContext);
  const { team } = useContext(AuthContext);
  // const [price, setPrice] = useState(properties[index].price);
  const [discount, setDiscount] = useState(0);

  const [question, setQuestion] = useState(null);
  const [solved, setSolved] = useState(true);

  // console.log("propertyModel.show", propertyModel.show);
  if (!propertyModel.show) return <></>;
  // setTimeout(() => propertyModel.setShow(false));
  // console.log(properties[index].price);
  // console.log(price);
  const specialIndex = [2, 4, 7, 17, 22, 32, 36, 38];

  const buyProperty = async (id) => {
    console.log("buys", id);
    const { data } = await axios.post("/property/buy");
    console.log("emit");
    socket.emit("trigger_update_ownershipMap");
    console.log("after buy", data);
  };
  // console.log(index);
  const propertyImage = require(`../gameScene/properties/${index + 1}.jpg`);
  const payRent = () => {};

  const getQuestion = async () => {
    const { data } = await axios.get("/question/").then(({ data }) => data);

    console.log(data);

    setQuestion(data);
  };
  const checkAns = async () => {
    const { data } = await axios.get("/question/checkAnswer");
    console.log(data);
    setDiscount(question.rentReduction);
    // setPrice(properties[index].price - question.rentReduction);
  };

  return (
    <div className={classes.popUp}>
      <button
        onClick={() => propertyModel.setShow(false)}
        className={classes.closeModal}>
        <i className="fas fa-times fa-2x"></i>
      </button>
      <div className={classes.modalContainer}>
        <div className={classes.imgProperty}>
          <img
            src={propertyImage.default}
            alt="Image"
            className={index % 10 === 0 ? classes.corner : classes.tiles}
          />
        </div>

        <div
          className={
            (index % 10 === 0 ? classes.cornerContent : classes.tilesContent) +
            " " +
            classes.modalContent
          }>
          <h1 className={classes.propName}>{properties[index].name}</h1>
          {index % 10 !== 0 && !specialIndex.includes(index) ? (
            <div className={classes.prices}>
              <div className={classes.buyprice}>
                {" "}
                Buy: ${properties[index].price}
              </div>
              <div className={classes.rentprice}> Rent: $20</div>
            </div>
          ) : null}
          {index % 10 !== 0 && !specialIndex.includes(index) ? (
            ownershipMap[properties[index]._id] ? (
              ownershipMap[properties[index]._id] === team._id ? (
                <h2>Already bought by you</h2>
              ) : (
                <>
                  <h2>Pay rent</h2>
                  <button className={classes.rentbtn}>Pay Rent</button>
                </>
              )
            ) : (
              <div>
                <button onClick={getQuestion}>Get question</button>
                <button onClick={() => buyProperty(properties[index]._id)}>
                  BUY
                </button>
                {question && (
                  <>
                    <h1>{question.questionLink}</h1>
                    <button onClick={checkAns}>check ans</button>
                  </>
                )}

                <h4>{properties[index].price - discount}</h4>
              </div>
            )
          ) : specialIndex.includes(index) ? (
            index === 4 || index === 38 ? (
              <h2>You have paid a tax of 1000 points!</h2>
            ) : (
              <h2>This is a Special Card!</h2>
            )
          ) : index === 10 ? (
            <h2>You can win this!</h2>
          ) : index === 20 ? (
            <h2>You have paid 100 points to each team!</h2>
          ) : index === 30 ? (
            <h2>You have paid 500 points to get out of Jail!</h2>
          ) : (
            <h2>Here's to new beginings</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyModel;
