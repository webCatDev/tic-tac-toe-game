export const initialState = {
    // todo: change it to false
  didGameStart: false,
    currentPlayer: "X",
  squares: Array(9).fill(null),
  players: [
    {
      name: "",
      tag: "",
      selectedCharImage: "",
      winCount: 0,
    },
    {
      name: "",
      tag: "",
      selectedCharImage: "",
      winCount: 0,
    },
  ],
  winner: "",
  gameRecords: {},
};

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'handleStart':
            console.log(action.payload)
            return {
              ...state,
              players: [
                {
                  name: action.payload.player1Name,
                  tag: action.payload.player1Tag,
                  selectedCharImage: action.payload.player1Image,
                  winCount: state.players[0].winCount,
                },
                {
                  name: action.payload.player2Name,
                  tag: action.payload.player1Tag === "X" ? 'O' : 'X',
                  selectedCharImage: action.payload.player2Image,
                  winCount: state.players[1].winCount,
                },
                ],
              didGameStart: true
            };
        case 'handleClick':
            const newSquares = [...state.squares]
            newSquares[action.payload.index] = state.currentPlayer
            console.log(newSquares)

            return {
                ...state,
                squares: newSquares,
                currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X'
            }
        default:
            return state;
  }
};

export default gameReducer;
