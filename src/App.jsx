import { useReducer } from "react";

import GameBoard from "./components/GameBoard";
import GameSettings from "./components/GameSettings";
import RestartDialog from "./components/RestartDialog";
import ScoreBoard from "./components/ScoreBoard";
import Square from "./components/Square";

import gameReducer, { initialState } from "./reducers/gameReducer";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <>
      {!state.didGameStart && <GameSettings dispatcher={dispatch} />}
      {!state.winner && state.didGameStart && (
        <>
          <ScoreBoard players={state.players} currentPlayer={state.currentPlayer} />
        <GameBoard gameState={state} dispatcher={dispatch}>
          {state.squares.map((value, i) => (
            <Square dispatcher={dispatch} key={`s${i}`} index={i} value={value} />
          ))}
          </GameBoard>
          </>
      )}

      {state.winner && <RestartDialog dispatcher={dispatch} winner={state.winner} />}
    </>
  );
}

export default App;
