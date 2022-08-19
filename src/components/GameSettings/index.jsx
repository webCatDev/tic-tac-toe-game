import { useEffect, useState } from "react";
import useAudio from "../../hooks/useAudio";
import classes from "./index.module.css";

import musicURL from "../../music/game-music.wav";

const GameSettings = ({ dispatcher }) => {
  const initialPlayerInfo = {
    "player-1-name": sessionStorage.getItem("player-1-name") || "",
    "player-2-name": sessionStorage.getItem("player-2-name") || "",
    "player-1-tag": sessionStorage.getItem("player-1-tag") || "X",
  };

  const [playerInfo, setPlayerInfo] = useState(initialPlayerInfo);
  const [isAgainstComputer, setIsAgainstComputer] = useState(true);
  const [muted, toggleMusicPlayState] = useAudio(musicURL);

  const handleInputChange = ({ target: { name, value } }) => {
    sessionStorage.setItem(name, value);
    setPlayerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const toggleState = (setter) => {
    setter((prevState) => !prevState);
  };

  const handleClickGameStart = () => {
    dispatcher({
      type: "handleStart",
      payload: {
        player1Name: playerInfo["player-1-name"],
        player2Name: isAgainstComputer
          ? "Computer"
          : playerInfo["player-2-name"],
        player1Tag: playerInfo["player-1-tag"],
        isAgainstComputer,
      },
    });
  };


  return (
    <section className={classes.gameSettings}>
      <div className="play-with">
        <button onClick={toggleState.bind(null, setIsAgainstComputer)}>
          {isAgainstComputer ? "Against Computer" : "Against Friend"}
        </button>
      </div>

      <div className="players-info">
        <div className={classes.playerNames}>
          <label htmlFor="player-1-name">
            {isAgainstComputer ? "Player Name" : "Player 1"}
          </label>
          <input
            id="player-1-name"
            name="player-1-name"
            type="text"
            placeholder="name"
            value={playerInfo["player-1-name"]}
            onChange={handleInputChange}
          />
          {!isAgainstComputer && (
            <>
              <label htmlFor="player-2-name">Player 2</label>
              <input
                id="player-2-name"
                name="player-2-name"
                type="text"
                placeholder="name"
                value={playerInfo["player-2-name"]}
                onChange={handleInputChange}
              />
            </>
          )}
        </div>
        <div className={classes.playerTags}>
          <p>{isAgainstComputer ? "Player Tag" : "Tag of Player 1"}</p>
          <div>
            <input
              id="player-1-x"
              type="radio"
              name="player-1-tag"
              onChange={handleInputChange}
              value="X"
              checked={playerInfo["player-1-tag"] === "X"}
            />
            <label
              htmlFor="player-1-x"
              className={
                playerInfo["player-1-tag"] === "X" ? classes.labelActive : ""
              }
            >
              X
            </label>
          </div>
          <div>
            <input
              id="player-1-o"
              type="radio"
              name="player-1-tag"
              onChange={handleInputChange}
              value="O"
              checked={playerInfo["player-1-tag"] === "O"}
            />
            <label
              htmlFor="player-1-o"
              className={
                playerInfo["player-1-tag"] === "O" ? classes.labelActive : ""
              }
            >
              O
            </label>
          </div>
        </div>
      </div>
      <div className={classes.gameSound}>
        <p>Game Sound</p>
        <button aria-label="change game sound" onClick={toggleMusicPlayState}>
          {!muted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          )}
          {muted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      <div className={classes.gameStart}>
        <button aria-label="start game" onClick={handleClickGameStart}>
          Start Game
        </button>
      </div>
    </section>
  );
};

export default GameSettings;
