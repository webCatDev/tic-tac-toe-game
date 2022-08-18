import classes from "./index.module.css";
const Square = ({ index, image, turn, isClicked }) => {
    const images = {
        X: '',
        O: '',
        CAT: '',
        DOG: ''
    }
    
    return <button className={classes.square} index={index}>
        <img src={images[image]} alt={ image} />
    </button>;
};

export default Square;
