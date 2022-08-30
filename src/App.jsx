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
import IconForDarkMode from "./components/Icons/IconForDarkMode";
import IconForLightMode from "./components/Icons/IconForLightMode";
import { createPortal } from "react-dom";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const hasTransitionedInGC = useMountTransition(
    !state.winner && state.didGameStart,
    500
  );

  const hasTransitionedInGS = useMountTransition(!state.didGameStart, 500);
  const handleDarkMode = () => dispatch({ type: "handleToggleDarkMode" });

  console.log(state.isDarkMode)

  return (
    <div
      className={`${classes.appContainer} ${
        state.isDarkMode ? classes.darkMode : ''
      }`}
    >
      {createPortal(
        <button className={`${classes.darkModeButton} ${state.isDarkMode ?  classes.darkMode : '' }`} onClick={handleDarkMode}>
          {state.isDarkMode ? <IconForDarkMode /> : <IconForLightMode />}
        </button>,
        document.getElementById("darkMode")
      )}

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
    </div>
  );
}

export default App;
