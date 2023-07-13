const express = require('express')
const {getAll,  createRole} = require("../controllers/roleController")
const {verifyJWT} = require("../utils/verifyJWT");

const routes = express.Router()

routes.get("/",  getAll)
routes.post("/",  createRole)


module.exports = routes