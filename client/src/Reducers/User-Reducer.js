export const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "REGISTER":
      return { ...payload };

    case "LOGIN":
      return { ...payload, loggedIn: true , wishlist:[] };

    case "LOGOUT":
      return { loggedIn: false };

    case "ADD" : 
     return  { ...state , wishlist:[...state.wishlist , payload] } ;

     case "REMOVE" :
       return { ... state , wishlist:[...state.wishlist.filter(crypto => crypto !== payload)] } 

    default:
      return state;
  }
};
