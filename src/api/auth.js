const Auth = {
  token: "",
  getToken() {
    this.token = localStorage.getItem("token");
    if (this.token === "") return null;
    return this.token;
  },
  setToken(token) {
    localStorage.setItem("token", token);
  },
  removeToken() {
    localStorage.clear();
  }
};

export default Auth;
