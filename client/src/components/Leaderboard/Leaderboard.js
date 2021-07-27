import '../../assets/css/leaderboard.css';
import { GrClose } from 'react-icons/gr';
import Row from './Row';
import { AuthContext } from '../../context/authContext';
import { GameContext } from '../../context/gameContext';
import { useContext } from 'react';

const Leaderboard = (props) => {
  const { team } = useContext(AuthContext);
  const { teams, netWorth } = useContext(GameContext);
  console.log(team, teams, netWorth);

  const teamsSample = [
    {
      teamName: 'team1',
      points: 100,
    },
    {
      teamName: 'team2',
      points: 200,
    },
    {
      teamName: 'team3',
      points: 150,
    },
    {
      teamName: 'team4',
      points: 250,
    },
    {
      teamName: 'team5',
      points: 80,
    },
    {
      teamName: 'team1',
      points: 100,
    },
    {
      teamName: 'team2',
      points: 200,
    },
    {
      teamName: 'team3',
      points: 150,
    },
    {
      teamName: 'team4',
      points: 250,
    },
    {
      teamName: 'team5',
      points: 80,
    },
    {
      teamName: 'team1',
      points: 100,
    },
    {
      teamName: 'team2',
      points: 200,
    },
    {
      teamName: 'team3',
      points: 150,
    },
    {
      teamName: 'team4',
      points: 250,
    },
    {
      teamName: 'team5',
      points: 80,
    },
  ];

  // sorting teams based on descending order of points
  let sortedTeams = teamsSample.sort((a, b) => {
    return b.points - a.points;
  });

  let sno = 1;
  return (
    <div className='leaderboard'>
      <GrClose className='close-icon' color='white' onClick={props.onClose} />
      <h2 className='leaderboard-heading'>Leaderboard</h2>
      <table id='leaderboard-table'>
        <thead>
          <tr>
            <th scope='col'>Rank</th>
            <th scope='col'>Team Name</th>
            <th scope='col'>Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team) => {
            return (
              <Row rank={sno++} teamName={team.teamName} points={team.points} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
