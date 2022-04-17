export const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "REGISTER":
      return { ...payload };

    case "LOGIN":
      return { ...payload , loggedIn: true };

    default:
      return state;
  }
};
