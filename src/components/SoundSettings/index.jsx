import IconForGameMusicOff from "../Icons/IconForGameMusicOff";
import IconForGameMusicOn from "../Icons/IconForGameMusicOn";
import IconForSoundsOff from "../Icons/IconForSoundsOff";
import IconForSoundsOn from "../Icons/IconForSoundsOn";
import classes from './index.module.css'

const SoundSettings = ({gameState, dispatcher}) => {
    return (
        <div className={classes.soundSettings}>
            <button onClick={() => dispatcher({type: "handleToggleSounds"})}>
                {gameState.isSoundsOn ? <IconForSoundsOn/> : <IconForSoundsOff />}
            </button>
            <button onClick={() => dispatcher({type: "handleToggleMusic"})}>
                {gameState.isMusicOn ? <IconForGameMusicOn/> : <IconForGameMusicOff />}
            </button>
        </div>
    );
}

export default SoundSettings;