import { destructureItem } from "../Utils/Utils-Functions";

export const cryptoStatsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET-CRYPTO-STATS":
      return destructureItem(payload) ;

    default:
      return state;
  }
};
