import React from 'react';
import TeamDetails from '../components/TeamDetails/TeamDetails';
import Cards from '../components/RightDashboard/Cards';
import RollDice from '../components/RightDashboard/RollDice';
import arcadiumLogo from '../assets/img/arcadium logo.png';

import '../assets/css/MainPage.css';
import GameScene from '../components/gameScene';
import AllTeamDetails from '../components/TopDashboard/AllTeamDetails';
import HeaderButtons from '../components/TopDashboard/HeaderButtons';

const MainPage = ({ team, socket, teams }) => {
  return (
    <div className='main-container'>
      <div className='main-header'>
        <div className='logo'>
          <img src={arcadiumLogo} alt='Logo' className='arcadium-logo' />
        </div>
        <div className='all-teams'>
          <AllTeamDetails teams={teams} />
        </div>
        <div className='nav-toggle'>
          <HeaderButtons />
        </div>
      </div>
      <div className='left-dashboard'>
        <TeamDetails
          teamName={team.teamName}
          teamMembers={team.members}
          game={team.game}
        />
      </div>
      <div className='main-board'>
        <GameScene socket={socket} />
      </div>
      <div className='right-dashboard'>
        <Cards />
        <RollDice socket={socket} />
      </div>
    </div>
  );
};

export default MainPage;
