export const initialState = {
  // todo: change it to false
  didGameStart: false,
  isAgainstComputer: true,
  currentPlayer: "X",
  squares: Array(9).fill(null),
  players: [
    {
      name: "",
      tag: "",
      winCount: 0,
    },
    {
      name: "",
      tag: "",
      winCount: 0,
    },
  ],
  winner: "",
  gameRecords: {},
};

const checkForWinner = (squares, state) => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winPatterns) {
    if (!squares[a] || !squares[b] || !squares[c]) {
    } else if (squares[a] === squares[b] && squares[b] === squares[c]) {
      state.players[
        state.players.findIndex((p) => p.tag === state.currentPlayer)
      ].winCount++;
      return state.currentPlayer;
    }
  }

  if (squares.some((s) => s === null)) {
    return "";
  } else {
    return "draw";
  }
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "handleStart":
      console.log(action.payload);
      return {
        ...initialState,
        players: [
          {
            ...state.players[0],
            name: action.payload.player1Name,
            tag: action.payload.player1Tag,
          },
          {
            ...state.players[1],
            name: action.payload.player2Name,
            tag: action.payload.player1Tag === "X" ? "O" : "X",
          },
        ],
        didGameStart: true,
        isAgainstComputer: action.payload.isAgainstComputer,
      };
    case "handleClick":
      if (state.squares[action.payload.index]) return state;
      if (
        state.isAgainstComputer &&
        state.currentPlayer !== state.players[0].tag
      )
        return state;

      const squares = [...state.squares];
      squares[action.payload.index] = state.currentPlayer;

      const winner = checkForWinner(squares, state);

      return {
        ...state,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        players: [...state.players],
        squares,
        winner,
      };

      case "handleComputerMove":
          const newSquares = [...state.squares];
          const nullSquareIndexes = state.squares.reduce((acc,cur, i) => cur === null ? [...acc, i] : acc, []);
          console.log(state.squares, nullSquareIndexes)
      newSquares[nullSquareIndexes[ Math.floor(Math.random() * nullSquareIndexes.length)]] =
        state.currentPlayer;

      return {
        ...state,
        squares: newSquares,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        players: [...state.players],
        winner: checkForWinner(newSquares, state),
      };

    case "handleRestart":
      return {
        ...state,
        didGameStart: true,
        currentPlayer: "X",
        squares: Array(9).fill(null),
        winner: "",
      };
    default:
      return state;
  }
};

export default gameReducer;
