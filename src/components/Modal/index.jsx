import Languages from '../../Languages';
import IconForClose from '../Icons/IconForClose';
import classes from './index.module.css'
const Modal = ({ children, dispatcher, gameState }) => {
  const {closeModalText} = Languages[gameState.lang].modal
    return (
      <div className={classes.modal}>
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