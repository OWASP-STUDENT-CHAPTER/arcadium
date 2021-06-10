import { useState, useEffect, createContext, useCallback } from "react";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  // const updatePos = (teamId, x, y) => {
  const updatePos = (teamId, pos) => {
    const t = [...teams];
    // console.log(teamId, x, y);
    console.log(teams);
    const i = t.findIndex((team) => {
      // console.log(team._id);
      return team._id === teamId;
    });
    console.log(i);
    // return;
    // t[i].game.pos = { x, y };

    t[i].game.posIndex = pos;
    setTeams(t);
  };

  useEffect(() => {
    console.log("new teams", teams);
  }, [teams]);

  return (
    <GameContext.Provider
      value={{
        teams,
        setTeams,
        updatePos,
      }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };
