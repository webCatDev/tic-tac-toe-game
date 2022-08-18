import { useReducer } from "react";

import GameBoard from "./components/GameBoard";
import GameSettings from "./components/GameSettings";
import Square from "./components/Square";

import gameReducer, { initialState } from "./reducers/gameReducer";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <>
      {!state.didGameStart && <GameSettings dispatcher={dispatch} />}

      {state.didGameStart && (
        <GameBoard>
          {state.squares.map((value, i) => (
            <Square dispatcher={dispatch} key={`s${i}`} index={i} value={value} />
          ))}
        </GameBoard>
      )}
    </>
  );
}

export default App;
