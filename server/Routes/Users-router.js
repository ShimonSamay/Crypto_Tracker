const usersRouter = require("express").Router();
const { getAllUsers ,getUserById ,addUser ,updateUser ,deleteUser,register, login} = require("../Controllers/Users-controller")

usersRouter.get("/" , getAllUsers);
usersRouter.get("/:id" , getUserById);
usersRouter.post("/" , addUser);
usersRouter.post("/register" , register )
usersRouter.post("/login",login)
usersRouter.put("/:id" , updateUser)
usersRouter.delete("/:id" , deleteUser)

module.exports = usersRouter ;