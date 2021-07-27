import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../../context/gameContext';

import '../../assets/css/TeamDetails.css';

const TeamDetails = ({ teamName, teamMembers, game, socket }) => {
  const [balance, setBalance] = useState(game.money);
  const [debt, setDebt] = useState(0);

  const { properties, ownershipMap, setNetWorth, netWorth } =
    useContext(GameContext);
  console.log(ownershipMap);
  const toNumbers = (arr) => arr.map(Number);
  const ownedProps = toNumbers(Object.keys(ownershipMap));
  let worthProp = 0;
  for (var i = 0; i < ownedProps.length; i++)
    worthProp += properties[ownedProps[i] - 1].price;

  setNetWorth(0.3 * balance + 0.7 * worthProp);
  console.log(balance, worthProp, netWorth);
  // useEffect(()=>{
  //   // updateBalance(game.mon)
  // },[ownershipMap])

  useEffect(() => {
    socket.on('update_balance', (data) => {
      console.log('updated', data);
      updateBalance(data.teamMoney);
      updateDebt(data.teamMoney);
      setNetWorth(0.3 * data.teamMoney + 0.7 * worthProp);
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
        <ul className='properties'>
          <h2 className='details-heading'>Properties</h2>
          {ownedProps.map((owned) => {
            return (
              <li className='property' key={owned - 1}>
                {properties[owned - 1].name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default TeamDetails;
