import { useEffect, useState } from "react";
import IconForGameMusicOff from "../Icons/IconForGameMusicOff";
import IconForGameMusicOn from "../Icons/IconForGameMusicOn";
import classes from "./index.module.css";
import Languages from "../../Languages";
import { createPortal } from "react-dom";
import Modal from "../Modal";
import HighScores from "../HighScores";
import HowToPlay from "../HowToPlay";
import useMountTransition from "../../hooks/useMountTransition";

const GameSettings = ({ dispatcher, gameState }) => {
  // TEXTS DEPENDING ON SELECTED LANGUAGE
  const {
    difficultyTexts,
    difficultyLabel,
    howToPlayText,
    highScoresText,
    emptyNameError,
    computerName,
    toggleAgainstComputerText,
    against,
    player1Label,
    playerNamePlaceholder,
    player2Label,
    playerTagLabel,
    musicLabel,
    toggleMusicAriaLabel,
    startGameText,
    duplicateNameError,
  } = Languages[gameState.lang].gameSettings;

  const initialPlayerInfo = {
    "player-1-name": sessionStorage.getItem("player-1-name") || "",
    "player-2-name": sessionStorage.getItem("player-2-name") || "",
    "player-1-tag": sessionStorage.getItem("player-1-tag") || "X",
  };

  const [playerInfo, setPlayerInfo] = useState(initialPlayerInfo);
  const [isAgainstComputer, setIsAgainstComputer] = useState(true);
  const [error, setError] = useState(null);
  const [difficultyIdx, setDifficultyIdx] = useState(
    JSON.parse(sessionStorage.getItem("difficultyIdx")) || 0
  );

  const hasTransitionedInHTP = useMountTransition(
    gameState.modalName === "howToPlay",
    500
  );
  const hasTransitionedInHS = useMountTransition(
    gameState.modalName === "highScores",
    500
  );

  // REMOVE ERRORS AFTER SOMETIME
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  // SET PLAYER INFO DEPENDING ON NAME AND VALUE
  const handleInputChange = ({ target: { name, value } }) => {
    sessionStorage.setItem(name, value);
    setPlayerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  // TOGGLE BOOLEAN STATES
  const toggleState = (setter) => {
    setter((prevState) => !prevState);
  };

  // SHOW GAME BOARD AND START THE GAME
  const handleClickGameStart = () => {
    if (
      !playerInfo["player-1-name"].trim() ||
      (!isAgainstComputer && !playerInfo["player-2-name"].trim())
    ) {
      setError(emptyNameError);
      return;
    }

    if (
      playerInfo["player-1-name"].trim().toLocaleLowerCase() ===
      playerInfo["player-2-name"].trim().toLocaleLowerCase()
    ) {
      setError(duplicateNameError);
      return;
    }

    dispatcher({
      type: "handleStart",
      payload: {
        player1Name: playerInfo["player-1-name"],
        player2Name: isAgainstComputer
          ? computerName
          : playerInfo["player-2-name"],
        player1Tag: playerInfo["player-1-tag"],
        isAgainstComputer,
      },
    });
  };

  const handleClickDifficulty = () => {
    setDifficultyIdx((prevIdx) => (prevIdx === 2 ? 0 : prevIdx + 1));
    const idx = difficultyIdx === 2 ? 0 : difficultyIdx + 1;
    sessionStorage.setItem("difficultyIdx", JSON.stringify(idx));
    dispatcher({ type: "handleDifficultyChange", payload: { idx} });
  };

  return (
    <section className={classes.gameSettings}>
      <div className="how-to-play">
        <button
          aria-label={howToPlayText}
          onClick={() =>
            dispatcher({
              type: "handleModalStateChange",
              payload: {
                modalName: "howToPlay",
              },
            })
          }
        >
          {howToPlayText}
        </button>
        {(gameState.modalName === "howToPlay" || hasTransitionedInHTP) &&
          createPortal(
            <Modal
              hasTransitionedIn={hasTransitionedInHTP}
              gameState={gameState}
              dispatcher={dispatcher}
            >
              <HowToPlay gameState={gameState} />
            </Modal>,
            document.getElementById("modal")
          )}
      </div>
      <div className="high-scores">
        <button
          aria-label={highScoresText}
          onClick={() =>
            dispatcher({
              type: "handleModalStateChange",
              payload: {
                modalName: "highScores",
              },
            })
          }
        >
          {highScoresText}
        </button>
        {(gameState.modalName === "highScores" || hasTransitionedInHS) &&
          createPortal(
            <Modal
              hasTransitionedIn={hasTransitionedInHS}
              gameState={gameState}
              dispatcher={dispatcher}
            >
              <HighScores gameState={gameState} />
            </Modal>,
            document.getElementById("modal")
          )}
      </div>
      <div className={classes.langAndOpponent}>
        <button
          aria-label={
            gameState.lang === "Türkçe"
              ? "oyun dilini ingilizce yap"
              : "change game language to English"
          }
          onClick={() => dispatcher({ type: "handleToggleLanguage" })}
        >
          {gameState.lang === "Türkçe" ? "Türkçe" : "English"}
        </button>

        <button
          aria-label={
            isAgainstComputer
              ? toggleAgainstComputerText[0]
              : toggleAgainstComputerText[1]
          }
          aria-expanded={!isAgainstComputer}
          aria-controls="sectPlayer2"
          id="againstCompBtn"
          onClick={toggleState.bind(null, setIsAgainstComputer)}
        >
          {isAgainstComputer ? against[0] : against[1]}
        </button>
      </div>

      <div className="players-info">
        <div className={classes.playerNames}>
          <label htmlFor="player-1-name">
            {isAgainstComputer ? player1Label[0] : player1Label[1]}
          </label>
          <input
            required
            id="player-1-name"
            name="player-1-name"
            type="text"
            maxLength={5}
            placeholder={playerNamePlaceholder}
            value={playerInfo["player-1-name"]}
            onChange={handleInputChange}
          />
          {!isAgainstComputer && (
            <div
              className={classes.player2Name}
              role="region"
              id="sectPlayer2"
              aria-labelledby="againstCompBtn"
            >
              <label htmlFor="player-2-name">{player2Label}</label>
              <input
                required
                id="player-2-name"
                name="player-2-name"
                type="text"
                maxLength={5}
                placeholder={playerNamePlaceholder}
                value={playerInfo["player-2-name"]}
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>
        <div className={classes.playerTags}>
          <p>{isAgainstComputer ? playerTagLabel[0] : playerTagLabel[1]}</p>
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
        <p>{musicLabel}</p>
        <button
          aria-label={
            gameState.isMusicOn
              ? toggleMusicAriaLabel[0]
              : toggleMusicAriaLabel[1]
          }
          onClick={() => dispatcher({ type: "handleToggleMusic" })}
        >
          {!gameState.isMusicOn && <IconForGameMusicOff />}
          {gameState.isMusicOn && <IconForGameMusicOn />}
        </button>
      </div>

      <div className={classes.difficulty}>
        <p>{difficultyLabel}</p>
        <button
          aria-label={difficultyTexts[difficultyIdx]}
          onClick={handleClickDifficulty}
        >
          {difficultyTexts[difficultyIdx]}
        </button>
      </div>

      {error && <p className={classes.error}>{error}</p>}
      <div className={classes.gameStart}>
        <button aria-label={startGameText} onClick={handleClickGameStart}>
          {startGameText}
        </button>
      </div>
    </section>
  );
};

export default GameSettings;
