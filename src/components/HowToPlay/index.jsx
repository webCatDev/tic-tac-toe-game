import WinPattern1 from "./SVGs/WinPattern1";
import WinPattern2 from "./SVGs/WinPattern2";
import WinPattern3 from "./SVGs/WinPattern3";

import classes from './index.module.css'

const HowToPlay = () => {
    return (
        <div className={classes.howToPlay}>
            <p>Aim of this game to achive ooo or xxx horizantally, veritcally or diagnolly</p>
            <div className={classes.imageBox}>
                <WinPattern1/>
                <WinPattern2/>
                <WinPattern3/>
            </div>
        </div>
    );
}

export default HowToPlay;