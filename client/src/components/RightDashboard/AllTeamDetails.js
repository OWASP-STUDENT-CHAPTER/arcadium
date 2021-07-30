import React from 'react';

import '../../assets/css/RightDashboard.css';

const AllTeamDetails = ({ teams }) => {
  return (
    <>
      <div className='teams-list'>
        <div className='teams-title'>
          <h1>Teams</h1>
        </div>
        <div className='teams'>
          {teams.map((team) => {
            return (
              <div key={team._id} className='team'>
                <span className='team-name' key={team._id}>
                  {team.teamName}
                </span>
              </div>
            );
          })}
          {/* <div className='team'>
            <i className='fas fa-chess-pawn fa-3x' style={{ color: 'red' }} />
            <span className='team-name'>Team 2</span>
          </div>
          <div className='team'>
            <i className='fas fa-chess-pawn fa-3x' style={{ color: 'green' }} />
            <span className='team-name'>Team 3</span>
          </div>
          <div className='team'>
            <i
              className='fas fa-chess-pawn fa-3x'
              style={{ color: 'yellow' }}
            />
            <span className='team-name'>Team 4</span>
          </div>
          <div className='team'>
            <i className='fas fa-chess-pawn fa-3x' style={{ color: 'black' }} />
            <span className='team-name'>Team 5</span>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AllTeamDetails;
