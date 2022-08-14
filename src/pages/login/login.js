import Modal from "../../components/Layout/Modal";

function Login({ isShow, onClose }) {
  return (
    <Modal isShow={isShow} onClose={onClose} title="Log in to your account">
      <form>
        <div className="form mb-4">
          <input type="email"placeholder="Email" className="form-control" />
        </div>

        <div className="form mb-4">
          <input type="password" placeholder="Password" className="form-control" />
        </div>

        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member? <a href="/sign-up">Sign up</a>
          </p>
        </div>
      </form>
    </Modal>
  );
}

export default Login;
