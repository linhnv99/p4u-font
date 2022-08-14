const mailRegex =
  /^[A-Za-z0-9][A-Za-z0-9\.]{0,62}[A-Za-z0-9]@[A-Za-z0-9][A-Za-z0-9\-\.]{0,251}[A-Za-z0-9]$/;
const usernameRegex = /^[a-zA-Z0-9_]{8,32}$/;
const passwordRegex = /[^a-z0-9A-Z!#/$%&()*+\-.\[\]\\:,;<=>?@^_{|}~]/

export const validateEmail = (email) => {
  if (!mailRegex.test(email)) return "";
  return email;
};

export const validateUsername = (username) => {
  if (username.length < 8 || !usernameRegex.test(username)) return "";
  return username;
};

export const validatePassword = (password) => {
  if (password.length < 8 || !passwordRegex.test(password)) return "";
  return password;
};
