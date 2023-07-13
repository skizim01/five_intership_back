const express = require('express')
const {register, login, getUserInfo} = require("../controllers/userControllers")
const {verifyJWT} = require("../utils/verifyJWT");


const routes = express.Router()


routes.post("/signup",  register)
routes.post("/signin",  login)
routes.post("/getdata",  verifyJWT, getUserInfo)





module.exports = routes