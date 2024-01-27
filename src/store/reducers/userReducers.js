import { UserConst } from "../../constants";
const initState = {
  me: {},
  error: "",
  isLogin: false,
  isLoading: true
};
const userReducers = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UserConst.GET_ME:
      return {
        ...state,
        me: payload,
        isLogin: true,
        isLoading: false
      };
    case UserConst.GET_ME_FAIL:
      return {
        ...state,
        error: payload?.error || payload,
      };
    default:
      return state;
  }
};

export default userReducers;
