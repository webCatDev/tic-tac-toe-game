import classes from "./index.module.css";
const HighScores = ({ scores }) => {
const scorers = Object.keys(scores)
    return (<>
        {!scorers.length && <p>You have not played any game yet</p>}
        <ul className={classes.scoreList}>{scorers.map(scorer => <li key={scorer}><span>{scorer}</span><span>{scores[scorer]}</span></li>)}</ul>
    </>
    );
}

export default HighScores;