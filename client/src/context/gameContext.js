import { useState, createContext, useMemo } from 'react';

import genBoard from '../util/genBoard';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const board = useMemo(() => genBoard(), []);

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
        updatePos,
        board,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };
