import { UserConst } from "../../constants";
import services from "../../api/services";

const userActions = {
  getMe: () => async (dispatch) => {
    try {
      const response = await services.getMe();
      dispatch({ type: UserConst.GET_ME, payload: response.data });
    } catch (error) {
      let errorObj = error.data;
      if (error.status === 401) errorObj = "Unauthorized";
      dispatch({ type: UserConst.GET_ME_FAIL, payload: errorObj });
    }
  },
};

export default userActions;
