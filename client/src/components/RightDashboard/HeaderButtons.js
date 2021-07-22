import React from 'react';

import '../../assets/css/RightDashboard.css';

const HeaderButtons = () => {
  return (
    <div className='header-buttons'>
      <button className='leaderboard-btn'>Leaderboard</button>
      <button className='sign-out-btn'>Sign Out</button>
    </div>
  );
};

export default HeaderButtons;
