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
                    ? "rgb(224, 35, 13)"
                    : gameState.isAgainstComputer
                    ? null
                    : "rgb(76, 86, 153)"
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
