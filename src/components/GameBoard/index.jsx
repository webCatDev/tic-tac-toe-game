import classes from './index.module.css'

const GameBoard = ({children}) => {
    return (
        <main className={classes.gameBoard}>
            {children}
        </main>
    );
}

export default GameBoard;