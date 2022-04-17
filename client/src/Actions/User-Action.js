export const registerAction = (value) => {
  return {
    type: "REGISTER",
    payload: value,
  };
};

export const loginAction = (value) => {
  return {
    type : "LOGIN" ,
    payload : value
  }
}
