import { useReducer } from "react";

import GameBoard from "./components/GameBoard";
import GameSettings from "./components/GameSettings";
import RestartDialog from "./components/RestartDialog";
import ScoreBoard from "./components/ScoreBoard";
import Square from "./components/Square";

import gameReducer, { initialState } from "./reducers/gameReducer";
import GameBoardSettings from "./components/GameBoardSettings";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <>
      {!state.didGameStart && (
        <GameSettings dispatcher={dispatch} gameState={state} />
      )}
      {!state.winner && state.didGameStart && (
        <>
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
        </>
      )}

      {state.winner && (
        <RestartDialog dispatcher={dispatch} gameState={state} />
      )}
    </>
  );
}

export default App;
