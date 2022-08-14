import Modal from "../../components/Layout/Modal";

function SignUp({ isShow, onClose }) {
  return (
    <Modal isShow={isShow} onClose={onClose} title="Sign up to discover">
      <form>
        <div className="form mb-4">
          <input type="username" placeholder="Username" className="form-control" />
        </div>

        <div className="form mb-4">
          <input type="email" placeholder="Email" className="form-control" />
        </div>

        <div className="form mb-4">
          <input type="password" placeholder="Password" className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign up
        </button>

        <div className="text-center">
          <p>
            Have an account? <a href="/login">Login</a>
          </p>
        </div>
      </form>
    </Modal>
  );
}

export default SignUp;
