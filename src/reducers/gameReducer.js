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
        case 'handlePlayerInfoChange':
            return {}
        default:
            return state;
  }
};

export default gameReducer;
