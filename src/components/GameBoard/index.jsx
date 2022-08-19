import { useEffect } from "react";
import sleep from "../../utils/sleep";
import classes from "./index.module.css";

const GameBoard = ({ children, gameState, dispatcher }) => {
      useEffect(() => {
        if (
          gameState.isAgainstComputer &&
          gameState.currentPlayer !== gameState.players[0].tag
        ) {
          (async () => {
            await sleep(1000);
            dispatcher({ type: "handleComputerMove" });
          })();
        }
      }, [gameState.currentPlayer]);
  return <main className={classes.gameBoard}>{children}</main>;
};

export default GameBoard;
