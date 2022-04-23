export const validatePasswords = (user , confirmPassword) => {
 return user.password === confirmPassword ;
} ;

export const addCommas = (string) => {
   return string.toLocaleString('en-US');
};

export const destructureItem = (item) => {
  return item.length ? [...item] : {...item} ;
};
