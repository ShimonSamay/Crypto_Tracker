require("dotenv").config();
require("./DB/DB")
const express = require("express");
const cors = require("cors");


const app = express();
const PORT = 4000;

const usersRouter = require("./Routes/Users-router");



app.use(cors());
app.use(express.json());

app.use("/users" , usersRouter);


app.listen(PORT , () => {
    console.log("server is running");
})