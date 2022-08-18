import IconForDraw from "../Icons/IconForDraw";
import IconForO from "../Icons/IconForO";
import IconForX from "../Icons/IconForX";
import classes from './index.module.css';

const RestartDialog = ({ winner, dispatcher }) => {
    
    const handleClick = () => {
        dispatcher({type: 'handleRestart'})
    }

    return (
        <div className={classes.restartDialog}>
            <h1>{winner==="X" || winner === 'O' ? 'WINNER' : 'DRAW'}</h1>
            {winner === 'X' ? <IconForX/> : winner === 'O' ? <IconForO/> : <IconForDraw /> }
            <button onClick={handleClick}>Restart Game</button>
        </div>
    );
}

export default RestartDialog;