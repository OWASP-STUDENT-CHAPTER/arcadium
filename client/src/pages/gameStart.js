import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

import { AuthContext } from "../context/authContext";
import { GameContext } from "../context/gameContext";

const GameStart = () => {
  const { team: user } = useContext(AuthContext); //! fix
  const { teams, setTeams } = useContext(GameContext);
  console.log(user.teams[0]._id);
  // console.log(v);
  // const [socket] = useState(

  // );

  useEffect(() => {
    console.log("a");

    // const socket = io("http://localhost:5000");

    const socket = io(process.env.REACT_APP_BASE_URL, {
      query: {
        teamId: user.teams[0]._id,
      },
    });
    // socket.emit('a')
    socket.on("testMSG", (data) => {
      console.log(data);
      setTeams(data.teams);
    });

    socket.on("team_left", (data) => {
      // console.log("left data", data);
      setTeams(data.teams);
    });
  }, [user]);

  return (
    <>
      <h1>START GAME </h1>
      <Link to="/game">GO TO GAME</Link>
      <h1>MY TEAM : {user.teams[0].teamName} </h1>
      {/* <button onClick={() => setA(a + 1)}>CLICK</button> */}
      <ul>
        {teams.map((t) => (
          <li key={t._id}>{t.teamName}</li>
        ))}
      </ul>
    </>
  );
};

export default GameStart;
