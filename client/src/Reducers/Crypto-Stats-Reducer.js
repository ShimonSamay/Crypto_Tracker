export const cryptoStatsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET-CRYPTO-STATS":
      return { ...payload };

    default:
      return state;
  }
};
