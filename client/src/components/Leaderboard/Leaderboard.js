import '../../assets/css/leaderboard.css';
import { GrClose } from 'react-icons/gr';
import Row from './Row';
import axios from '../../util/axios';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
// import { useQuery } from 'react-query';

const Leaderboard = (props) => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getAllTeams = async () => {
    try {
      const res = await axios.get('/team');
      setTeams(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  // const allTeams = useQuery(
  //   'auth',
  //   async () => {
  //     try {
  //       const res = await axios.get('/team');
  //       return res.data;
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   {
  //     retry: false,
  //     staleTime: Infinity,
  //   }
  // );

  useEffect(() => {
    getAllTeams();
  }, []);
  // console.log(allTeams);

  const teamsSample = teams.map((team) => {
    const data = {
      teamName: team.teamName,
      points: Math.floor(team.game.points),
    };
    return data;
  });

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
            <th style={{ fontSize: '1.2rem' }} scope='col'>
              Rank
            </th>
            <th style={{ fontSize: '1.2rem' }} scope='col'>
              Team Name
            </th>
            <th style={{ fontSize: '1.2rem' }} scope='col'>
              Points
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td>
                <Spinner />
              </td>
              <td>
                <Spinner />
              </td>
              <td>
                <Spinner />
              </td>
            </tr>
          )}
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
