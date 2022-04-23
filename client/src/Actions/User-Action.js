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

export const logoutAction = () => {
  return {
    type : "LOGOUT" ,
  }
}

export const addToWishlist = (value) => {
  return {
    type : "ADD" ,
    payload : value
  }
}

export const removeFromWishlist = (value) => {
  return {
    type : "REMOVE" ,
    payload : value
  }
}


