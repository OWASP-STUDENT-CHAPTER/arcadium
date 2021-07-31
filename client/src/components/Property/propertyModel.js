import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { GameContext } from '../../context/gameContext';
import swal from 'sweetalert';
import axios from '../../util/axios';
import Timer from '../Timer/Timer';
import { useState } from 'react/cjs/react.development';
import classes from './propertyModel.module.css';
import Spinner from '../Spinner/Spinner';

const PropertyModel = ({ socket }) => {
  const { propertyModel, properties, index, ownershipMap, setBalance } =
    useContext(GameContext);
  const { team } = useContext(AuthContext);
  // const [price, setPrice] = useState(properties[index].price);
  const [discount, setDiscount] = useState(0);

  const timeStart = { hours: 0, mins: 20, secs: 0 };

  const [question, setQuestion] = useState(null);
  const [questionLoading, setQuestionLoading] = useState(true);
  const [solved, setSolved] = useState(true);
  useEffect(() => {
    setQuestion(null);
    setDiscount(0);
  }, [index]);
  // console.log("propertyModel.show", propertyModel.show);
  if (!propertyModel.show) return <></>;
  // setTimeout(() => propertyModel.setShow(false));
  // console.log(properties[index].price);
  // console.log(price);
  const specialIndex = [2, 4, 7, 17, 22, 32, 36, 38];

  const buyProperty = async (id) => {
    console.log('buys', id);
    try {
      const { data } = await axios.post('/property/buy');
      console.log('emit');
      socket.emit('trigger_update_ownershipMap');
      console.log('after buy', data.money);
      setBalance(data.money);

      socket.emit('g');
      swal({
        title: 'Congratulations!',
        text: 'Property Bought!',
        icon: 'success',
      });
    } catch (error) {
      if (error === 'insufficient balance')
        swal({
          title: 'Oops!',
          text: 'Insufficient Funds',
          icon: 'warning',
        });
    }
  };
  // console.log(index);
  const propertyImage = require(`../gameScene/properties/${index + 1}.jpg`);
  const payRent = () => {
    socket.emit('pay_rent', {
      pos: index,
    });
    console.log('paying rent ');
  };

  const getQuestion = async () => {
    const { data } = await axios.get('/question/').then(({ data }) => data);

    console.log(data);

    setQuestion(data);
    setQuestionLoading(false);
  };
  const checkAns = async (type) => {
    const { data } = await axios.post('/question/checkAnswer', {
      type,
    });
    console.log(data);
    if (type == 'rent') setDiscount(30);
    else setDiscount(50);
    // setPrice(properties[index].price - question.rentReduction);
  };

  return (
    <div className={classes.popUp}>
      <button
        onClick={() => propertyModel.setShow(false)}
        className={classes.closeModal}
      >
        <i className='fas fa-times fa-2x'></i>
      </button>

      <div className={classes.modalContainer}>
        <div
          className={
            classes.imgProperty +
            ' ' +
            ((index >= 1 && index <= 9) || (index >= 31 && index <= 39)
              ? classes.rotImg
              : classes.doneImg)
          }
        >
          <img
            src={propertyImage.default}
            alt='Image'
            className={index % 10 === 0 ? classes.corner : classes.tiles}
          />
        </div>

        <div
          className={
            (index % 10 === 0 ? classes.cornerContent : classes.tilesContent) +
            ' ' +
            classes.modalContent
          }
        >
          <div className={classes.timerModal}>
            <Timer time={timeStart} />
          </div>
          <h1 className={classes.propName}>{properties[index].name}</h1>
          {index % 10 !== 0 && !specialIndex.includes(index) ? (
            <div className={classes.prices}>
              {!ownershipMap[properties[index]._id] ? (
                <div className={classes.buyprice}>
                  Buy: $
                  {properties[index].price -
                    (discount * properties[index].price) / 100}
                </div>
              ) : (
                <div className={classes.rentprice}>
                  Rent: $
                  {properties[index].rent -
                    (discount * properties[index].rent) / 100}
                </div>
              )}
            </div>
          ) : null}
          {index % 10 !== 0 && !specialIndex.includes(index) ? (
            ownershipMap[properties[index]._id] ? (
              ownershipMap[properties[index]._id] === team._id ? (
                <h4 className={classes.modalMsg}>
                  You are the owner of the property!
                </h4>
              ) : (
                <>
                  <div className={classes.buttons}>
                    <button onClick={payRent} className={classes.rentbtn}>
                      Pay Rent
                    </button>
                    <span>OR</span>
                    <button className={classes.linkbtn}>Question Link</button>
                  </div>
                </>
                //   <div>
                //   {!question && (
                //     <>
                //       <button className={classes.linkbtn} onClick={getQuestion}>
                //         Get Question
                //       </button>
                //       <h4>OR</h4>
                //     </>
                //   )}

                //   {question && (
                //     <>
                //       <h4>{question.questionLink}</h4>
                //       <button className={classes.rentbtn} onClick={checkAns}>
                //         Check Answer
                //       </button>
                //     </>
                //   )}
                //   {/* <h4>{properties[index].price - discount}</h4> */}
                //   <button
                //     className={classes.rentbtn}
                //     onClick={() => buyProperty(properties[index]._id)}
                //   >
                //     Pay Rent
                //   </button>
                // </div>
              )
            ) : (
              // <>
              //   <div className={classes.buttons}>
              //     <button
              //       onClick={() => buyProperty(properties[index]._id)}
              //       className={classes.buybtn}
              //     >
              //       Buy
              //     </button>
              //     <button className={classes.linkbtn}>Question Link</button>
              //   </div>
              // </>
              <div>
                {!question && (
                  <>
                    <button className={classes.linkbtn} onClick={getQuestion}>
                      Get Question
                    </button>
                    <span>OR</span>
                  </>
                )}

                {question && (
                  <>
                    <div className={classes.quesLink}>
                      <a
                        href={`https://my.newtonschool.co/course/qqwqaafu35/assignment/${question.link}`}
                      >{`https://my.newtonschool.co/course/qqwqaafu35/assignment/${question.link}`}</a>
                    </div>

                    <button
                      className={classes.rentbtn}
                      onClick={() =>
                        checkAns(
                          ownershipMap[properties[index]._id] ? 'rent' : 'buy'
                        )
                      }
                    >
                      Check Answer
                    </button>
                  </>
                )}
                {/* <h4>{properties[index].price - discount}</h4> */}
                <button
                  className={classes.buybtn}
                  onClick={() => buyProperty(properties[index]._id)}
                >
                  Buy
                </button>
              </div>
            )
          ) : specialIndex.includes(index) ? (
            index === 4 || index === 38 ? (
              <h2 className={classes.modalMsg}>
                You have paid a tax of 1000 points!
              </h2>
            ) : (
              <h2 className={classes.modalMsg}>This is a Special Card!</h2>
            )
          ) : index === 10 ? (
            <h2 className={classes.modalMsg}>You can win this!</h2>
          ) : index === 20 ? (
            <h2 className={classes.modalMsg}>
              You have paid 100 points to each team!
            </h2>
          ) : index === 30 ? (
            <h2 className={classes.modalMsg}>
              You have paid 500 points to get out of Jail!
            </h2>
          ) : (
            <h2 className={classes.modalMsg}>
              2000 points have been added to your balance amount.
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyModel;
