const {Role} = require('../schema/RoleSchema');


const getAll = async (req, res) => {
    const roles = await Role.find()
    if (!roles) {
        res.status(500).json({message: "DB err"})
    }
    else {
        res.status(200).json(roles)
    }
}


const createRole = async (req, res) => {
    if (await Role.findOne({name:req.body.name})) {
       return   res.status(400).json({message: "This role is exist"})
    }
    const newRole = await new Role({name: req.body.name})
    newRole.save().then((obj) => res.status(200).json({...obj}))
        .catch(() => res.status(500).json({message: "DB error"}))
}


module.exports = {
    createRole, getAll
}