export const initialState = {
  // todo: change it to false
  didGameStart: false,
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

const gameReducer = (state, action) => {
  switch (action.type) {
    case "handleStart":
      console.log(action.payload);
      return {
        ...initialState,
        players: [
          {
            name: action.payload.player1Name,
            tag: action.payload.player1Tag,
            selectedCharImage: action.payload.player1Image,
            winCount: state.players[0].winCount,
          },
          {
            name: action.payload.player2Name,
            tag: action.payload.player1Tag === "X" ? "O" : "X",
            selectedCharImage: action.payload.player2Image,
            winCount: state.players[1].winCount,
          },
        ],
        didGameStart: true,
      };
    case "handleClick":
      if (state.squares[action.payload.index]) return state;
      const newSquares = [...state.squares];
      newSquares[action.payload.index] = state.currentPlayer;

      const checkForWinner = () => {
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
          if (!newSquares[a] || !newSquares[b] || !newSquares[c]) {
          } else if (
            newSquares[a] === newSquares[b] &&
            newSquares[b] === newSquares[c]
          ) {
            console.log('playerxxx', state.players[state.currentPlayer === "X" ? 0 : 1]);
            state.players[state.players.findIndex(p => p.tag === state.currentPlayer)].winCount++;
            return state.currentPlayer;
          }
        }

        if (newSquares.some((s) => s === null)) {
          return "";
        } else {
          return "draw";
        }
      };

      const winner = checkForWinner();

      return {
        ...state,
        squares: newSquares,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        players: [...state.players],
        winner,
          };
      case 'handleRestart':
          return {
            ...state,
            didGameStart: true,
            currentPlayer: "X",
              squares: Array(9).fill(null),
            winner: ''
          };
    default:
      return state;
  }
};

export default gameReducer;
