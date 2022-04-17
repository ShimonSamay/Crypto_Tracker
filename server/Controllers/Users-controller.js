const Users = require("../Models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req,res) => {
  const {email , password} = req.body;
  const user = await Users.findOne({email:email});
  if(user) return res.status(400).json({message: "email exist , try again"});
  bcrypt.hash(password , 10 , async (err , hashed) => {
      if(err) return res.status(400).json({Error: "error accrued while hashing password"});
      req.body.password = hashed;
      await Users.create(req.body)
      .then(() => res.status(200).json({success:true}))
      .catch(error => res.status(500).json({success:false,error}))
  })
};


const login =  async (req,res) => {
   const {email , password} = req.body;
   const user = await Users.findOne({email:email});
   if(user == null) return res.status(400).json({message:"email not found"});
   bcrypt.compare(password , user.password , (err , isMatch) => {
    if (err) return res.status(500).json({message:"error while hashing password"});
    if(!isMatch) return res.status(400).json({message:"not matching password"})
    const token = jwt.sign({user},process.env.SECRET_KEY , {expiresIn:"30m"});
    return res.status(200).json({loggedIn:true , token});
   })
};


const getAllUsers = async (req, res) => {
    await Users.find()
   .then(data => res.status(200).json(data))
   .catch(error => res.status(404).json({error}))
};


const getUserById = async (req,res) => {
    await Users.findById({_id:req.params.id})
    .then((data) => {
      if (data === null) return res.status(400).json({message:"No user found"});
      if (data == undefined) return res.status(400).json({Error: "got undefined data"})
      return res.status(200).json(data)
    })
    .catch(error => res.status(404).json({error}))
};


const addUser = async (req,res) => {
    if(req.body == null) return res.status(400).json({message:"empty data received"});
    if(req.body == undefined) return res.status(400).json({Error: "got undefined data"})
    await Users.create(req.body);
    await Users.find()
   .then(data => res.status(200).json(data))
   .catch(error => res.status(404).json({error}))
};


const updateUser = async (req,res) => {
    if(req.body == null) return res.status(400).json({message:"empty data received"});
    if(req.body == undefined) return res.status(400).json({Error: "got undefined data"})
    await Users.findByIdAndUpdate({_id:req.params.id},req.body)
    await Users.find()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(400).json({error}))
};


const deleteUser = async (req,res) => {
   await Users.findByIdAndDelete({_id:req.params.id})
   await Users.find()
   .then(data => res.status(200).json(data))
   .catch(error => res.status(404).json({error}))
};


module.exports = {
    getAllUsers ,
    getUserById ,
    addUser ,
    updateUser ,
    deleteUser ,
    register,
    login
}