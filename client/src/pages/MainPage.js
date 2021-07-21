import { useState } from 'react';
import TeamDetails from '../components/TeamDetails/TeamDetails';
import Cards from '../components/RightDashboard/Cards';
import RollDice from '../components/RightDashboard/RollDice';
import arcadiumLogo from '../assets/img/arcadium logo.png';

import '../assets/css/MainPage.css';
import GameScene from '../components/gameScene';
import AllTeamDetails from '../components/TopDashboard/AllTeamDetails';
import HeaderButtons from '../components/TopDashboard/HeaderButtons';
import SimpleModal from '../components/Modals/Modal';

const MainPage = ({ team, socket, teams }) => {
  const [canMove, setCanMove] = useState(true);
  const [dice, setDice] = useState(0);

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
        <GameScene
          socket={socket}
          dice={dice}
          setDice={setDice}
          setCanMove={setCanMove}
        />
        {/* <SimpleModal /> */}
      </div>
      <div className='right-dashboard'>
        <Cards />
        <RollDice
          socket={socket}
          dice={dice}
          setDice={setDice}
          canMove={canMove}
        />
      </div>
    </div>
  );
};

export default MainPage;
