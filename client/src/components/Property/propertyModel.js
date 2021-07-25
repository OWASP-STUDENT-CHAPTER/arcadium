import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { GameContext } from '../../context/gameContext';
import axios from '../../util/axios';
import classes from './propertyModel.module.css';

const PropertyModel = ({ socket }) => {
  const { propertyModel, properties, index, ownershipMap, teams } =
    useContext(GameContext);

  const { team } = useContext(AuthContext);
  console.log('propertyModel.show', propertyModel.show);
  if (!propertyModel.show) return <>no popup</>;
  // setTimeout(() => propertyModel.setShow(false));

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
        <div className={classes.imgProperty}>
          <img
            src={propertyImage.default}
            alt='Image'
            className={index % 10 === 0 ? classes.corner : classes.tiles}
          />
        </div>

        <div className={classes.modalContent}>
          <h1 className={classes.propName}>{properties[index].name}</h1>
          {index % 10 !== 0 ? (
            ownershipMap[properties[index]._id] ? (
              ownershipMap[properties[index]._id] === team._id ? (
                <h2>Already bought by you</h2>
              ) : (
                <h2>Pay rent</h2>
              )
            ) : (
              <button
                onClick={() => buyProperty(properties[index]._id)}
                className={classes.buybtn}
              >
                BUY
              </button>
            )
          ) : index === 10 ? (
            <h2>You can win this!</h2>
          ) : index === 20 ? (
            <h2>You have paid 100 points to each team!</h2>
          ) : index === 30 ? (
            <h2>500 points has been deducted from your account</h2>
          ) : (
            <h2>Here's to new beginings</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyModel;
