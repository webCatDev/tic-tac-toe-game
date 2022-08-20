const Modal = ({children, dispatcher}) => {
    return (
      <div className={classes.modal}>
        <header>
          <button onClick={() => dispatcher({type: 'handleModalClose'})}>Close</button>
        </header>
        <main>{children}</main>
      </div>
    );
}

export default Modal;