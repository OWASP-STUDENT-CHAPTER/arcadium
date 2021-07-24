import "../../assets/css/leaderboard.css";

const Row=(props)=>{
    return(
        <tr>
            <td>{props.rank}</td>
            <td>{props.team.teamName}</td>
            <td>{props.team.points}</td>
        </tr>
    );
}

export default Row;