import '../../assets/css/leaderboard.css';

const Row = ({ rank, teamName, points }) => {
  return (
    <tr>
      <td>{rank}</td>
      <td>{teamName}</td>
      <td>{points}</td>
    </tr>
  );
};

export default Row;
