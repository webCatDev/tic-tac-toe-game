import classes from "./index.module.css";
const HighScores = ({ scores }) => {
    return (
        <ul className={classes.scoreList}>{Object.keys(scores).map(scorer => <li key={scorer}><span>{scorer}</span><span>{scores[scorer]}</span></li>)}</ul>
    );
}

export default HighScores;