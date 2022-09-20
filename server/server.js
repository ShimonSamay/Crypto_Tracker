require("dotenv").config();
require("./DB/DB");
const express = require("express");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 4000 ;

const app = express();

const usersRouter = require("./Routes/Users-router");

app.use(cors());
app.use(express.json());

app.use("/users" , usersRouter);    


app.listen(PORT , () => {
    console.log(`server is running at Port : ${PORT}`);
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
};


