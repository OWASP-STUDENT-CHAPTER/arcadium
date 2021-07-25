import { useState, createContext, useMemo, useEffect } from 'react';
import axios from '../util/axios';

import genBoard from '../util/genBoard';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [properties, setProperties] = useState([]);
  const [ownershipMap, setOwnershipMap] = useState({});
  const board = useMemo(() => genBoard(), []);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPropertyModel, setShowPropertyModel] = useState(false);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    axios.get('/property/room').then(({ data }) => {
      setOwnershipMap(data.data.ownershipMap); //! update with socket events
      setProperties(data.data.properties);
    });
  }, []);

  const updatePos = (teamId, pos) => {
    const t = [...teams];
    const i = t.findIndex((team) => team._id === teamId);
    t[i].game.posIndex = pos;
    setTeams(t);
  };

  return (
    <GameContext.Provider
      value={{
        teams,
        setTeams,
        index,
        setIndex,
        updatePos,
        board,
        properties,
        isAnimating,
        setIsAnimating,
        ownershipMap,
        setOwnershipMap,
        propertyModel: {
          setShow: setShowPropertyModel,
          show: showPropertyModel,
        },
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };
