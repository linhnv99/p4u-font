import services from "../../api/services";
import Auth from "../../api/auth";
import { LoginConst } from "../../constants";

const authActions = {
  login: (args, cb) => async (dispatch) => {
    dispatch({type: LoginConst.REQUEST})
    try {
      const response = await services.login(args);
      Auth.setToken(response.data.access_token);
      dispatch({type: LoginConst.SUCCESS, payload: response.data})
      cb(null)
    } catch (error) {
      dispatch({type: LoginConst.FAIL, payload: error.data})
      cb({message: error.data?.error || error.data, timeStamp: Date.now()});
    }
  }, 
  signUp: (args, cb) => async (dispatch) => {
    dispatch()
  }
};

export default authActions;
