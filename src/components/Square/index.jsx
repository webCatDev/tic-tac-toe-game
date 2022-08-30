import IconForO from "../Icons/IconForO";
import IconForX from "../Icons/IconForX";
import classes from "./index.module.css";
const Square = ({ index,gameState, dispatcher, value }) => {
    
    const handleHover = (event) => {
        const button = event.target.closest('button')

          !button.innerHTML
            ? document
                .querySelector("html")
                .style.setProperty(
                  "--color-square-bg",
                  gameState.currentPlayer === "X"
                    ? "#fc9f95"
                    : gameState.isAgainstComputer
                    ? null
                    : "#7177a0"
                )
            : document
                .querySelector("html")
                .style.setProperty("--color-square-bg", null);
    };

    const handleClick = () => {
        dispatcher({
            type: 'handleClick',
            payload: {
                index
            }
})
    }
    
    return <button onMouseOver={handleHover} aria-label={value} onClick={handleClick} className={classes.square} index={index} value={value}>
        {value && (value === 'X' ? <IconForX /> : <IconForO />)}
    </button>;
};

export default Square;
