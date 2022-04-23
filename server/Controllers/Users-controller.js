const Users = require("../Models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req,res) => {
  const {email , password} = req.body;
  if(!email || !email.length) return res.status(400).json({success:false , message:"Email is required"});
  if(!password || !password.length) return res.status(400).json({success:false , message:"Password is required"});
  const user = await Users.findOne({email:email});
  if(user) return res.status(400).json({success:false , message: "email exist , try again"});
  bcrypt.hash(password , 10 , async (err , hashed) => {
      if(err) return res.status(400).json({ success:false , message: "error accrued while hashing password"});
      req.body.password = hashed;
      await Users.create(req.body)
      .then(() => res.status(200).json({success:true ,  message: "Registered successfully"}))
      .catch(() => res.status(500).json({success:false , message:"Registration failed"}))
  })
};


const login =  async (req,res) => {
   const {email , password} = req.body;
   if(!email || !email.length) return res.status(400).json({success:false , message:"Email is required"});
   if(!password || !password.length) return res.status(400).json({success:false , message:"Password is required"});
   const user = await Users.findOne({email:email});
   if(!user) return res.status(400).json({success:false , message:"Email not found"});
   bcrypt.compare(password , user.password , (err , isMatch) => {
    if (err) return res.status(500).json({ success:false , message:"error while hashing password"});
    if(!isMatch) return res.status(400).json({success:false,message:"Wrong password"})
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
    .then((user) => {
      if (!user) return res.status(400).json({message:"No user found"});
      return res.status(200).json(user)
    })
    .catch(error => res.status(404).json({error}))
};


const addUser = async (req,res) => {
    if(!req.body) return res.status(400).json({message:"empty data received"});
    await Users.create(req.body);
    await Users.find()
   .then(data => res.status(200).json(data))
   .catch(error => res.status(404).json({error}))
};


const updateUser = async (req,res) => {
    if(!req.body) return res.status(400).json({message:"empty data received"});
    await Users.findByIdAndUpdate({_id:req.params.id},req.body)
    await Users.find()
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({error}))
};


const deleteUser = async (req,res) => {
   await Users.findByIdAndDelete({_id:req.params.id})
   await Users.find()
   .then(user => res.status(200).json(user))
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