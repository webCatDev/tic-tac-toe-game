import classes from "./index.module.css";
import Languages from "../../Languages";


const HighScores = ({ scores, gameState }) => {
  const {noScoreTexts} = Languages[gameState.lang].highScores
const scorers = Object.keys(gameState.gameRecords)
    return (
        <ul className={classes.scoreList}>
        {!scorers.length && noScoreTexts.map(text => <p key={text}>{text}</p>)}
          {scorers.map((scorer) => (
            <li key={scorer}>
              <span>{scorer}</span>
              <span>{gameState.gameRecords[scorer]}</span>
            </li>
          ))}
        </ul>
    );
}

export default HighScores;