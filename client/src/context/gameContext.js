import { useState, createContext, useMemo, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from '../util/axios';

import genBoard from '../util/genBoard';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [ownershipMap, setOwnershipMap] = useState({});
  const [netWorth, setNetWorth] = useState(0);
  const board = useMemo(() => genBoard(), []);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPropertyModel, setShowPropertyModel] = useState(false);
  const [index, setIndex] = useState(0);
  const [canMove, setCanMove] = useState(true);
  // const init/
  const { data: roomData } = useQuery(
    'roomData',
    () => axios.get('/property/room').then((res) => res.data.data),
    {
      initialData: { ownershipMap: {}, properties: [] },
    }
  );

  useEffect(() => {
    setCanMove(!isAnimating);
  }, [isAnimating]);

  const updatePos = (teamId, pos, myTeam) => {
    if (myTeam === teamId) {
      // console.log("SAMEE");
      setCanMove(false);
      return setIndex(pos);
    }
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
        canMove,
        setCanMove,
        updatePos,
        board,
        properties: roomData.properties || [],
        ownershipMap: roomData.ownershipMap || {},
        isAnimating,
        setIsAnimating,
        netWorth,
        setNetWorth,
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
