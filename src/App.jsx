import { useReducer } from "react";

import GameBoard from "./components/GameBoard";
import GameSettings from "./components/GameSettings";
import Square from "./components/Square";

import gameReducer, { initialState } from "./reducers/gameReducer";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <>
      {!state.didGameStart && <GameSettings />}

      {state.didGameStart && (
        <GameBoard>
          {state.squares.map((value, i) => (
            <Square key={`s${i}`} index={i} />
          ))}
        </GameBoard>
      )}
    </>
  );
}

export default App;
