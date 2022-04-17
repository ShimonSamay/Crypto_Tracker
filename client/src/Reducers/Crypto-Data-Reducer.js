export const cryptoDataReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET-DATA":
      return [...payload];

    default:
      return state;
  }
};
