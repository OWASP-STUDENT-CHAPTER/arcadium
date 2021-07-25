import { useContext, useState } from 'react';
import TeamDetails from '../components/TeamDetails/TeamDetails';
import RollDice from '../components/RightDashboard/RollDice';
import arcadiumLogo from '../assets/img/arcadium logo.png';

import '../assets/css/MainPage.css';
import Timer from '../components/Timer/Timer';
import GameScene from '../components/gameScene';
import AllTeamDetails from '../components/RightDashboard/AllTeamDetails';
import HeaderButtons from '../components/RightDashboard/HeaderButtons';
import PropertyModel from '../components/Property/propertyModel';
import { GameContext } from '../context/gameContext';
import Leaderboard from '../components/Leaderboard/Leaderboard';

const MainPage = ({ team, socket, teams }) => {
  
  const [canMove, setCanMove] = useState(true);
  const[leaderboard, setLeaderboard]=useState(false);
  const [dice, setDice] = useState(0);
  const { properties } = useContext(GameContext);
  if (properties.length === 0) return <>Loading...</>;
  
  const timeStart= {hours: 2, mins: 0, secs: 0};
  
  const leaderboardHandler=()=>{
    if(leaderboard)
    setLeaderboard(false);
    else
    setLeaderboard(true);
  }
  return (
    <div className='main-container'>
      <PropertyModel socket={socket} />
      <div className='main-header'>
        <div className='logo'>
          <img src={arcadiumLogo} alt='Logo' className='arcadium-logo' />
        </div>
        <div >
          <Timer time={timeStart} />
        </div>
      </div>
      <div className='left-dashboard'>
        <TeamDetails
          teamName={team.teamName}
          teamMembers={team.members}
          game={team.game}
          socket={socket}
        />
      </div>
      <div className='main-board'>
        <GameScene
          socket={socket}
          dice={dice}
          setDice={setDice}
          setCanMove={setCanMove}
        />
        {/* <SimpleModal /> */}
      </div>
      <div className='right-dashboard'>
        {/* <Cards /> */}
        <HeaderButtons leaderboardHandler={leaderboardHandler} />
        <div className='all-teams'>
          <AllTeamDetails teams={teams} />
        </div>
        <RollDice
          socket={socket}
          dice={dice}
          setDice={setDice}
          canMove={canMove}
        />
      </div>
      {
          leaderboard?
          <Leaderboard onClose={leaderboardHandler}/>
          :null
       }
    </div>
  );
};

export default MainPage;
