import { useHistory } from "react-router-dom";
import "./index.css";

function Progress({ isLoading, isSuccess, urlRedirect }) {
  const history = useHistory();

  return (
    <div className={`wp-progress ${isLoading ? "d-block" : "d-none"}`}>
      <div className="overlay"></div>
      <div className={`modal-progress ${isLoading ? "show" : "hide"}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Đang xử lý...
              </h5>
            </div>
            <div className="modal-body">
              {isSuccess ? (
                <h6>Tải lên thành công.</h6>
              ) : (
                <div className="progress">
                  <span
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    style={{ width: "100%" }}
                  ></span>
                </div>
              )}
            </div>
            <div className="modal-footer">
              {isSuccess && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => history.push(urlRedirect)}
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
