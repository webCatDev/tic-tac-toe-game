import Languages from "../../Languages";
import IconForGameMusicOff from "../Icons/IconForGameMusicOff";
import IconForGameMusicOn from "../Icons/IconForGameMusicOn";
import IconForMenu from "../Icons/IconForMenu";
import IconForSoundsOff from "../Icons/IconForSoundsOff";
import IconForSoundsOn from "../Icons/IconForSoundsOn";
import classes from './index.module.css'


const GameBoardSettings = ({gameState, dispatcher}) => {
    return (
        <div className={classes.soundSettings}>
            <button aria-label={Languages[gameState.lang].gameBoardSettings.mainMenuText} onClick={()=>dispatcher({type: 'handleMainMenu'})}> <IconForMenu/></button>
        <button
          aria-label={
            gameState.isSoundsOn
              ? Languages[gameState.lang].gameBoardSettings.toggleSoundAriaLabel[0]
              : Languages[gameState.lang].gameBoardSettings.toggleSoundAriaLabel[1]
          }
          onClick={() => dispatcher({ type: "handleToggleSounds" })}
        >
          {gameState.isSoundsOn ? <IconForSoundsOn /> : <IconForSoundsOff />}
        </button>
        <button
          aria-label={
            gameState.isMusicOn
              ? Languages[gameState.lang].gameBoardSettings.toggleMusicAriaLabel[0]
              : Languages[gameState.lang].gameBoardSettings.toggleMusicAriaLabel[1]
          }
          onClick={() => dispatcher({ type: "handleToggleMusic" })}
        >
          {gameState.isMusicOn ? (
            <IconForGameMusicOn />
          ) : (
            <IconForGameMusicOff />
          )}
        </button>
      </div>
    );
}

export default GameBoardSettings;