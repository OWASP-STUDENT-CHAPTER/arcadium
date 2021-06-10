import { useState, useEffect, createContext } from "react";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  return (
    <GameContext.Provider
      value={{
        teams,
        setTeams,
      }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };
