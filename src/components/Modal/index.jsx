import Languages from '../../Languages';
import IconForClose from '../Icons/IconForClose';
import classes from './index.module.css'
const Modal = ({ children, dispatcher, gameState, hasTransitionedIn }) => {
  const { closeModalText } = Languages[gameState.lang].modal
  const modalClasses = `${classes.modal} ${hasTransitionedIn && classes.in} ${!!gameState.modalName && classes.visible}`
    return (
      <div className={modalClasses}>
        <button
          title={closeModalText}
          aria-label={closeModalText}
            className={classes.closeModalButton}
            onClick={() =>
              dispatcher({
                type: "handleModalStateChange",
                payload: {
                  modalName: "",
                },
              })
            }
          >
            <IconForClose/>
          </button>
       {children}
      </div>
    );
}

export default Modal;