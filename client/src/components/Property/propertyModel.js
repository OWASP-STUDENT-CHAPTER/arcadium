import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { GameContext } from '../../context/gameContext';
import axios from '../../util/axios';
import Timer from '../Timer/Timer';
import classes from './propertyModel.module.css';

const PropertyModel = ({ socket }) => {
  const { propertyModel, properties, index, ownershipMap, teams } =
    useContext(GameContext);

  const { team } = useContext(AuthContext);
  console.log('propertyModel.show', propertyModel.show);
  if (!propertyModel.show) return <>no popup</>;
  // setTimeout(() => propertyModel.setShow(false));

  const timeStart = { hours: 0, mins: 20, secs: 0 };

  const specialIndex = [2, 4, 7, 17, 22, 32, 36, 38];

  const buyProperty = async (id) => {
    console.log('buys', id);
    const { data } = await axios.post('/property/buy');
    console.log('emit');
    socket.emit('trigger_update_ownershipMap');
    console.log('after buy', data);
  };
  console.log(index);
  const propertyImage = require(`../gameScene/properties/${index + 1}.jpg`);

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
              <div className={classes.buyprice}>
                {' '}
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
                  <div className={classes.buttons}>
                    <button className={classes.rentbtn}>Pay Rent</button>
                    <button className={classes.linkbtn}>Question Link</button>
                  </div>
                </>
              )
            ) : (
              <>
                <div className={classes.buttons}>
                  <button
                    onClick={() => buyProperty(properties[index]._id)}
                    className={classes.buybtn}
                  >
                    Buy
                  </button>
                  <button className={classes.linkbtn}>Question Link</button>
                </div>
              </>
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
