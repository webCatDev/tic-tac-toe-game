import { useReducer } from "react";
import classes from "./app.module.css";

import GameBoard from "./components/GameBoard";
import GameSettings from "./components/GameSettings";
import RestartDialog from "./components/RestartDialog";
import ScoreBoard from "./components/ScoreBoard";
import Square from "./components/Square";

import gameReducer, { initialState } from "./reducers/gameReducer";
import GameBoardSettings from "./components/GameBoardSettings";
import useMountTransition from "./hooks/useMountTransition";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const hasTransitionedInGC = useMountTransition(
    !state.winner && state.didGameStart,
    500
  );
  const hasTransitionedInGS = useMountTransition(!state.didGameStart, 500);

  return (
    <>
      {(!state.didGameStart || hasTransitionedInGS) && (
        <div
          className={`${classes.gameSettingsContainer} ${
            !state.didGameStart && classes.visible
          } ${hasTransitionedInGS && classes.inGS}`}
        >
          <GameSettings dispatcher={dispatch} gameState={state} />
        </div>
      )}
      {!state.winner && state.didGameStart && (
        <div
          className={`${classes.gameContainer} ${
            !state.winner && state.didGameStart && classes.visible
          } ${hasTransitionedInGC && classes.inGC}`}
        >
          <GameBoardSettings gameState={state} dispatcher={dispatch} />
          <ScoreBoard gameState={state} />
          <GameBoard gameState={state} dispatcher={dispatch}>
            {state.squares.map((value, i) => (
              <Square
                gameState={state}
                dispatcher={dispatch}
                key={`s${i}`}
                index={i}
                value={value}
              />
            ))}
          </GameBoard>
        </div>
      )}

      {state.winner && (
        <RestartDialog dispatcher={dispatch} gameState={state} />
      )}
    </>
  );
}

export default App;
