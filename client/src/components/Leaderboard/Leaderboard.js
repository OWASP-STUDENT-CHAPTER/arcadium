import "../../assets/css/leaderboard.css";
// import {GrClose} from 'react-icons/gr';
import Row from "./Row";

const Leaderboard = (props) => {
  const teams = [
    {
      teamName: "team1",
      points: 100,
    },
    {
      teamName: "team2",
      points: 200,
    },
    {
      teamName: "team3",
      points: 150,
    },
    {
      teamName: "team4",
      points: 250,
    },
    {
      teamName: "team5",
      points: 80,
    },
    {
      teamName: "team1",
      points: 100,
    },
    {
      teamName: "team2",
      points: 200,
    },
    {
      teamName: "team3",
      points: 150,
    },
    {
      teamName: "team4",
      points: 250,
    },
    {
      teamName: "team5",
      points: 80,
    },
    {
      teamName: "team1",
      points: 100,
    },
    {
      teamName: "team2",
      points: 200,
    },
    {
      teamName: "team3",
      points: 150,
    },
    {
      teamName: "team4",
      points: 250,
    },
    {
      teamName: "team5",
      points: 80,
    },
  ];

  // sorting teams based on descending order of points
  let sortedTeams = teams.sort((a, b) => {
    return b.points - a.points;
  });

  let sno = 1;
  return (
    <div className="leaderboard">
      {/* <GrClose className="close-icon" color="white" onClick={props.onClose}/> */}
      <h2 className="leaderboard-heading">Leaderboard</h2>
      <table id="leaderboard-table">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Team Name</th>
            <th scope="col">Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team) => {
            return <Row rank={sno++} team={team} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
