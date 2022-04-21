export const validatePasswords = (user , confirmPassword) => {
 return user.password === confirmPassword ;
} ;

export const setCryptoGraph = (crypto , dispatch , action) => {
  dispatch(action(crypto));
} 
