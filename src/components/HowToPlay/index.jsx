import WinPattern1 from "./SVGs/WinPattern1";
import WinPattern2 from "./SVGs/WinPattern2";
import WinPattern3 from "./SVGs/WinPattern3";

import classes from './index.module.css'
import IconForLeft from "../Icons/IconForLeft";
import IconForRight from "../Icons/IconForRight";
import { useState } from "react";

const HowToPlay = () => {
    const [currentSlide, setCurrentSlide] = useState(1)

    const handleSlideChange = ({ target: { name } }) => {
        if (name === 'left') {
            setCurrentSlide((slide) => (slide === 1 ? 3 : slide - 1));
        } else {
            setCurrentSlide(slide => slide === 3 ? 1 : slide + 1)
        }
    }

    return (
      <div className={classes.howToPlay}>
        <p>
          Aim of this game to achive OOO or XXX <br />
          horizantally, vertically or diagonally
        </p>
        <div className={classes.imageBox}>
          <button
            className={classes.arrowLeft}
            name="left"
            onClick={handleSlideChange}
          >
            <IconForLeft />
          </button>
          <button
            className={classes.arrowRight}
            name="right"
            onClick={handleSlideChange}
          >
            <IconForRight />
          </button>
          {currentSlide === 1 && <WinPattern1 />}
          {currentSlide === 2 && <WinPattern2 />}
          {currentSlide === 3 && <WinPattern3 />}
        </div>
      </div>
    );
}

export default HowToPlay;