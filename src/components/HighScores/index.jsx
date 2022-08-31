import classes from "./index.module.css";
import Languages from "../../Languages";


const HighScores = ({ gameState }) => {
  const {noScoreTexts} = Languages[gameState.lang].highScores
const scoreEntries = Object.entries(gameState.gameRecords)
    return (
      <ul className={classes.scoreList}>
        {!scoreEntries.length &&
          noScoreTexts.map((text) => <p key={text}>{text}</p>)}
        {scoreEntries
          .sort((a, b) => b[1] - a[1])
          .map(([scorer, score]) => (
            <li key={scorer}>
              <span>{scorer}</span>
              <span>{score}</span>
            </li>
          ))}
      </ul>
    );
}

export default HighScores;