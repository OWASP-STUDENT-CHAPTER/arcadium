import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

import { AuthContext } from "../context/authContext";
import { GameContext } from "../context/gameContext";
import GameScene from "../components/gameScene";

const GameStart = () => {
  const { team: user } = useContext(AuthContext); //! fix
  const { teams, setTeams } = useContext(GameContext);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const s = io(process.env.REACT_APP_BASE_URL, {
      query: {
        teamId: user.teams[0]._id,
      },
    });
    setSocket(s);
  }, [user]);

  useEffect(() => {
    if (!socket) return;
    socket.on("connected_teams_update", (data) => {
      console.log(data);
      setTeams(data.teams);
    });

    socket.on("team_left", (data) => {
      setTeams(data.teams);
    });
  }, [socket]);

  return (
    <>
      <h1>START GAME </h1>
      {/* <Link to="/game">GO TO GAME</Link> */}
      <h1>MY TEAM : {user.teams[0].teamName} </h1>
      <ul>
        {teams.map((t) => (
          <li key={t._id}>{t.teamName}</li>
        ))}
      </ul>
      <GameScene socket={socket} />
    </>
  );
};

export default GameStart;
