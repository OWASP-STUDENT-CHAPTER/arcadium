import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { GameContext } from '../../context/gameContext';
import axios from '../../util/axios';
import classes from './propertyModel.module.css';

const PropertyModel = ({ socket }) => {
  const { propertyModel, properties, index, ownershipMap } =
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
                <h1>already bought by you</h1>
              ) : (
                <h1>pay rent</h1>
              )
            ) : (
              <button onClick={() => buyProperty(properties[index]._id)}>
                BUY
              </button>
            )
          ) : (
            <h1>Kal aana</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyModel;
