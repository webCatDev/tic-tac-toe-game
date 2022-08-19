import IconForDraw from "../Icons/IconForDraw";
import IconForO from "../Icons/IconForO";
import IconForX from "../Icons/IconForX";
import classes from './index.module.css';
import Languages from "../../Languages";

const RestartDialog = ({  dispatcher, gameState }) => {
    
    const handleClick = () => {
        dispatcher({type: 'handleRestart'})
    }

    return (
        <div className={classes.restartDialog}>
            <h1>{gameState.winner==="X" || gameState.winner === 'O' ? Languages[gameState.lang].restartDialog.winnerText[0]: Languages[gameState.lang].restartDialog.winnerText[1]}</h1>
            {gameState.winner === 'X' ? <IconForX/> : gameState.winner === 'O' ? <IconForO/> : <IconForDraw /> }
            <button aria-label={Languages[gameState.lang].restartDialog.restartGameText} onClick={handleClick}>{ Languages[gameState.lang].restartDialog.restartGameText}</button>
        </div>
    );
}

export default RestartDialog;