import React, { useState, useEffect } from 'react';

import '../../assets/css/TeamDetails.css';

const TeamDetails = ({ teamName, teamMembers, game, socket }) => {
  const [balance, setBalance] = useState(game.money);
  const [debt, setDebt] = useState(0);

  const { money } = game;

  useEffect(() => {
    socket.on('update_balance', (data) => {
      console.log('updated', data);
      updateBalance(data.teamMoney);
      updateDebt(data.teamMoney);
    });
  }, []);

  const updateBalance = (data) => {
    if (data <= 0) setBalance(0);
    else setBalance(data);
  };
  const updateDebt = (data) => {
    if (data >= 0) setDebt(0);
    else setDebt(data - 2 * data);
  };

  return (
    <>
      <div className='team-details'>
        <div className='details-title'>
          <h1>Team Details</h1>
        </div>
        <div className='team-detail-name'>
          <h2 className='details-heading'>
            Team Name <br /> <span>{teamName}</span>
          </h2>
        </div>
        <div className='team-members'>
          <h2 className='details-heading'>Team Members</h2>
          {teamMembers.map((member) => {
            return (
              <p className='member' key={member._id}>
                {member.name}
              </p>
            );
          })}
        </div>
        <div className='balance'>
          <h2 className='details-heading'>Balance</h2>
          <p>{balance}</p>
        </div>
        <div className='debt'>
          <h2 className='details-heading'>Debt</h2>
          <p>{debt}</p>
        </div>
        <div className='properties'>
          <h2 className='details-heading'>Properties</h2>
          <p className='property'>Property 1</p>
          <p className='property'>Property 2</p>
          <p className='property'>Property 3</p>
          <p className='property'>Property 4</p>
        </div>
      </div>
    </>
  );
};

export default TeamDetails;
