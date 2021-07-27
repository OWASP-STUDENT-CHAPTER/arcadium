import { useContext, useState, useEffect } from "react";
import io from "socket.io-client";

import { AuthContext } from "../context/authContext";
import { GameContext } from "../context/gameContext";
import URL from "../util/URL";

import MainPage from "./MainPage";

const GameStart = () => {
  const { team } = useContext(AuthContext);
  const { teams, setTeams, index } = useContext(GameContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    //! retry connection
    const s = io(URL, {
      query: {
        teamId: team._id,
      },
    });
    setSocket(s);
  }, [team]);

  useEffect(() => {
    if (!socket) return;
    socket.on("connected_teams_update", (data) => {
      console.log(data);
      setTeams(data.teams);
    });

    socket.on("retry", (data) => {
      console.log(data);
      //! reset connection
    });

    socket.on("team_left", (data) => {
      setTeams(data.teams);
    });
  }, [socket]);

  return (
    <>
      <MainPage team={team} socket={socket} teams={teams} />
    </>
  );
};

export default GameStart;
