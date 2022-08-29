import winSoundURL from "../music/win-sound.mp3";
import loseSoundURL from "../music/lose-sound.mp3";
import clickSoundURL from "../music/click-sound.mp3";
import gameMusicURL from "../music/game-music.mp3";

const winSound = new Audio(winSoundURL);
const loseSound = new Audio(loseSoundURL);
const clickSound = new Audio(clickSoundURL);
const gameMusic = new Audio(gameMusicURL);

export const initialState = {
  modalName: "",
  lang: "English",
  difficulty: {
    level: ["EASY", "NORMAL", "HARD"],
    idx: JSON.parse(sessionStorage.getItem("difficultyIdx")) || 0,
  },
  didGameStart: false,
  isAgainstComputer: true,
  currentPlayer: "X",
  squares: Array(9).fill(null),
  isMusicOn: false,
  isSoundsOn: true,
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
  gameRecords: JSON.parse(localStorage.getItem("gameRecords")) || {},
};

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

const checkForWinner = (squares, state) => {
  for (const [a, b, c] of winPatterns) {
    if (!squares[a] || !squares[b] || !squares[c]) {
    } else if (squares[a] === squares[b] && squares[b] === squares[c]) {
      const winnerName = state.players.find(
        (player) => player.tag === state.currentPlayer
      ).name;

      if (
        state.isSoundsOn &&
        winnerName !== "Computer" &&
        winnerName !== "Bilgisayar"
      ) {
        // play win sound
        winSound.play();

        // add record to game records
        state.gameRecords[winnerName]
          ? state.gameRecords[winnerName]++
          : (state.gameRecords[winnerName] = 1);
        localStorage.setItem("gameRecords", JSON.stringify(state.gameRecords));
      }

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
      state.isMusicOn
        ? ((gameMusic.loop = true), gameMusic.play())
        : gameMusic.pause();
      return {
        ...initialState,
        players: [
          {
            winCount: 0,
            name: action.payload.player1Name,
            tag: action.payload.player1Tag,
          },
          {
            winCount: 0,
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

      state.isSoundsOn && clickSound.play();
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
 
      state.isSoundsOn && clickSound.play();
      const newSquares = [...state.squares];
      const nullSquareIndexes = state.squares.reduce(
        (acc, cur, i) => (cur === null ? [...acc, i] : acc),
        []
      );


      switch (state.difficulty.level[state.difficulty.idx]) {
        case "EASY":
          newSquares[
            nullSquareIndexes[
              Math.floor(Math.random() * nullSquareIndexes.length)
            ]
          ] = state.currentPlayer;
          break;
        case "NORMAL":
          const randomNumber = Math.floor(Math.random() * 2);
          if (randomNumber === 0) {
            newSquares[
              nullSquareIndexes[
                Math.floor(Math.random() * nullSquareIndexes.length)
              ]
            ] = state.currentPlayer;
          }

          if (randomNumber === 1) {
            const { squares } = state;
            let compDidMove = false;
            for (const [a, b, c] of winPatterns) {
              if (
                squares[a] &&
                squares[b] &&
                squares[a] === squares[b] &&
                !squares[c]
              ) {
                newSquares[c] = state.currentPlayer;
                compDidMove = true;
                break;
              }
              if (
                squares[a] &&
                squares[c] &&
                squares[a] === squares[c] &&
                !squares[b]
              ) {
                newSquares[b] = state.currentPlayer;
                compDidMove = true;
                break;
              }
              if (
                squares[b] &&
                squares[c] &&
                squares[b] === squares[c] &&
                !squares[a]
              ) {
                newSquares[a] = state.currentPlayer;
                compDidMove = true;
                break;
              }
            }

            if (compDidMove === false) {
              newSquares[
                nullSquareIndexes[
                  Math.floor(Math.random() * nullSquareIndexes.length)
                ]
              ] = state.currentPlayer;
            }
          }
          break;
        case "HARD":
          const { squares } = state;
          let compDidMove = false;
          const playerTag = state.players[0].tag;
          for (const [a, b, c] of winPatterns) {
            if (
              squares[a] &&
              squares[b] &&
              squares[a] === squares[b] &&
              squares[b] === playerTag &&
              !squares[c]
            ) {
              newSquares[c] = state.currentPlayer;
              compDidMove = true;
              break;
            }
            if (
              squares[a] &&
              squares[c] &&
              squares[a] === squares[c] &&
              squares[c] === playerTag &&
              !squares[b]
            ) {
              newSquares[b] = state.currentPlayer;
              compDidMove = true;
              break;
            }
            if (
              squares[b] &&
              squares[c] &&
              squares[b] === squares[c] &&
              squares[b] === playerTag &&
              !squares[a]
            ) {
              newSquares[a] = state.currentPlayer;
              compDidMove = true;
              break;
            }
          }

          if (compDidMove === false) {
            newSquares[
              nullSquareIndexes[
                Math.floor(Math.random() * nullSquareIndexes.length)
              ]
            ] = state.currentPlayer;
          }

          break;
        default:
          return { ...state };
      }

      const compWinCheck = checkForWinner(newSquares, state);
      compWinCheck === state.players[1].tag && loseSound.play();
      return {
        ...state,
        squares: newSquares,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        players: [...state.players],
        winner: compWinCheck,
      };

    case "handleRestart":
      return {
        ...state,
        didGameStart: true,
        currentPlayer: "X",
        squares: Array(9).fill(null),
        winner: "",
      };

    case "handleToggleMusic":
      !state.isMusicOn
        ? ((gameMusic.loop = true), gameMusic.play())
        : gameMusic.pause();
      return {
        ...state,
        isMusicOn: !state.isMusicOn,
      };
    case "handleToggleSounds":
      return {
        ...state,
        isSoundsOn: !state.isSoundsOn,
      };
    case "handleToggleLanguage":
      return {
        ...state,
        lang: state.lang === "Türkçe" ? "English" : "Türkçe",
      };
    case "handleMainMenu":
      return {
        ...state,
        winner: "",
        didGameStart: false,
        currentPlayer: "X",
        squares: Array(9).fill(null),
      };
    case "handleModalStateChange":
      return {
        ...state,
        modalName: action.payload.modalName,
      };
    case "handleDifficultyChange":
      state.difficulty.idx = action.payload.idx
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default gameReducer;
