import React, { useState, useEffect } from 'react';
import TeamMembers from './TeamMembers';

import '../../assets/css/TeamDetails.css';

const TeamDetails = ({ teamName, teamMembers, game }) => {
  const [balance, setBalance] = useState(0);
  const [debt, setDebt] = useState(0);

  const { points } = game;

  useEffect(() => {
    updateBalance();
    updateDebt();
  }, [points]);

  const updateBalance = () => {
    if (points <= 0) setBalance(0);
    else setBalance(points);
  };
  const updateDebt = () => {
    if (points >= 0) setDebt(0);
    else setDebt(points - 2 * points);
  };

  return (
    <>
      <div className='team-details'>
        <div className='details-title'>
          <h1>Team Details</h1>
        </div>
        <div className='team-members'>
          <h2 className='details-heading'>Team Name: {teamName}</h2>
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
