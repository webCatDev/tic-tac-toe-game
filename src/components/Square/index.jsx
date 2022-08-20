import IconForO from "../Icons/IconForO";
import IconForX from "../Icons/IconForX";
import classes from "./index.module.css";
const Square = ({ index,dispatcher, value}) => {
    const handleClick = () => {
        dispatcher({
            type: 'handleClick',
            payload: {
                index
            }
})
    }
    
    return <button aria-label={value} onClick={handleClick} className={classes.square} index={index} value={value}>
        {value && (value === 'X' ? <IconForX /> : <IconForO />)}
    </button>;
};

export default Square;
