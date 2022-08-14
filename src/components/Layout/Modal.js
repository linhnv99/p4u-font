function Modal({ children, isShow, onClose, title }) {
  return (
    <div className={`wp-modal  ${isShow ? "show" : "bgblack"}`}>
      <div className="overlay"></div>
      <div className="modal-container">
        <div className="modal-content">
          <div className="content">
            <div className="header">
              {onClose && (
                <button onClick={onClose} className="btn-close"></button>
              )}
              <h5 className="text-center mb-3 fw-bold">Present for you</h5>
            </div>
            <h2 className="title">{title}</h2>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
