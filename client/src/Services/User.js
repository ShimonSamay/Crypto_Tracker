
const baseUrl = process.env.NODE_ENV === "production" ? 
"https://crypto-tracker-7284.onrender.com/users" : "http://localhost:6500/users";

const createFetchOptions = (data) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return options ;
}

export const registerHandler = async (user) => {
  try {
     const options = createFetchOptions(user) ;
     const response = await fetch(`${baseUrl}/register`, options)
     const data = await response.json();
     return data ;
  }
  catch (err) {
    return err ;
  }
};

export const loginHandler = async (user) => {
  try {
   const options = createFetchOptions(user);
    const response = await fetch(`${baseUrl}/login`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
