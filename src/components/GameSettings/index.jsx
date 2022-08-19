import {  useState } from "react";
import IconForGameMusicOff from "../Icons/IconForGameMusicOff";
import IconForGameMusicOn from "../Icons/IconForGameMusicOn";
import classes from "./index.module.css";


const GameSettings = ({ dispatcher, gameState }) => {
  const initialPlayerInfo = {
    "player-1-name": sessionStorage.getItem("player-1-name") || "",
    "player-2-name": sessionStorage.getItem("player-2-name") || "",
    "player-1-tag": sessionStorage.getItem("player-1-tag") || "X",
  };

  const [playerInfo, setPlayerInfo] = useState(initialPlayerInfo);
  const [isAgainstComputer, setIsAgainstComputer] = useState(true);

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
        <p>Music</p>
        <button
          aria-label="change game sound"
          onClick={() => dispatcher({type: "handleToggleMusic"})}
        >
          {!gameState.isMusicOn && <IconForGameMusicOff />}
          {gameState.isMusicOn && <IconForGameMusicOn />}
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
