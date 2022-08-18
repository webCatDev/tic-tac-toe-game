import IconForO from "../Icons/IconForO";
import IconForX from "../Icons/IconForX";
import classes from "./index.module.css";

const ScoreBoard = ({ currentPlayer, players }) => {
    console.log(currentPlayer, players)
  const player1Classes = `${classes.player1} ${
    (currentPlayer === "X" && players[0].tag === "X") ||
    (currentPlayer === "O" && players[0].tag === "O")
      ? classes.activePlayer
      : ""
  }`;
  const player2Classes = `${classes.player2} ${
    (currentPlayer === "X" && players[1].tag === "X") ||
    (currentPlayer === "O" && players[1].tag === "O")
      ? classes.activePlayer
      : ""
  }`;

  return (
    <div className={classes.scoreBoard}>
      <div className={player1Classes}>
        <div className={classes.iconBox}>
          {players[0].tag === "X" ? <IconForX /> : <IconForO />}
        </div>

        <div className={classes.playerName}>
          <p>{players[0].name}</p>
        </div>

        <div className={classes.winCount}>
          <h1>{players[0].winCount}</h1>
        </div>
      </div>

      <div className={player2Classes}>
        <div className={classes.winCount}>
          <h1>{players[1].winCount}</h1>
        </div>

        <div className={classes.playerName}>
          <p>{players[1].name}</p>
        </div>

        <div className={classes.iconBox}>
          {players[1].tag === "X" ? <IconForX /> : <IconForO />}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
