import { LoginConst } from "../../constants";

const authReducers = (state = { isLoading: false }, action) => {
  const { type } = action;
  switch (type) {
    case LoginConst.REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LoginConst.SUCCESS:
      return {
        ...state,
        isLogin: true,
        isLoading: false,
      };
    case LoginConst.FAIL:
      return {
        isLoading: false,
        isLogin: false,
      };
    default:
      return state;
  }
};

export default authReducers;
