import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import { AuthContext } from '../context/authContext';
import { GameContext } from '../context/gameContext';
import GameScene from '../components/gameScene';
import MainPage from './MainPage';

const GameStart = () => {
  const { team } = useContext(AuthContext);
  const { teams, setTeams } = useContext(GameContext);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    //! retry connection
    const s = io(process.env.REACT_APP_BASE_URL, {
      query: {
        teamId: team._id,
      },
    });
    setSocket(s);
  }, [team]);

  useEffect(() => {
    if (!socket) return;
    socket.on('connected_teams_update', (data) => {
      console.log(data);
      setTeams(data.teams);
    });

    socket.on('retry', (data) => {
      console.log(data);
      //! reset connection
    });

    socket.on('team_left', (data) => {
      setTeams(data.teams);
    });
  }, [socket]);

  return (
    <>
      <MainPage team={team} socket={socket} teams={teams} />
      {/* <h1>START GAME </h1>
      <h1>MY TEAM : {team.teamName} </h1>
      <ul>
        {teams.map((t) => (
          <li key={t._id}>{t.teamName}</li>
        ))}
      </ul> */}
      {/* <GameScene socket={socket} /> */}
    </>
  );
};

export default GameStart;
