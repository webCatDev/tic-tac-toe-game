import classes from './index.module.css'
const Modal = ({ children, dispatcher }) => {
    return (
      <div className={classes.modal}>
          <button
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
            Close
          </button>
       {children}
      </div>
    );
}

export default Modal;