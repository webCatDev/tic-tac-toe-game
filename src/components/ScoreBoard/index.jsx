import IconForO from "../Icons/IconForO";
import IconForX from "../Icons/IconForX";
import classes from "./index.module.css";

const ScoreBoard = ({ gameState }) => {
 

  const player1Classes = `${classes.player1} ${
    (gameState.currentPlayer === "X" && gameState.players[0].tag === "X") ||
    (gameState.currentPlayer === "O" && gameState.players[0].tag === "O")
      ? classes.activePlayer
      : ""
  }`;

  const player2Classes = `${classes.player2} ${
    (gameState.currentPlayer === "X" && gameState.players[1].tag === "X") ||
    (gameState.currentPlayer === "O" && gameState.players[1].tag === "O")
      ? classes.activePlayer
      : ""
  }`;

  return (
    <div className={classes.scoreBoard}>
      <div className={player1Classes}>
        <div className={classes.iconBox}>
          {gameState.players[0].tag === "X" ? <IconForX /> : <IconForO />}
        </div>

        <div className={classes.playerName}>
          <p>{gameState.players[0].name}</p>
        </div>

        <div className={classes.winCount}>
          <h1>{gameState.players[0].winCount}</h1>
        </div>
      </div>

      <div className={player2Classes}>
        <div className={classes.winCount}>
          <h1>{gameState.players[1].winCount}</h1>
        </div>

        <div className={classes.playerName}>
          <p>{gameState.players[1].name}</p>
        </div>

        <div className={classes.iconBox}>
          {gameState.players[1].tag === "X" ? <IconForX /> : <IconForO />}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
