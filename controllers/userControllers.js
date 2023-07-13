const {UserValidationSchema, User} = require('../schema/UserSchema');
const {createHash} = require("../utils/hashHelper");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {Role} = require("../schema/RoleSchema");


const register = async (req, res) => {
    if (UserValidationSchema.validate(req.body).error) {
        res.status(400).json({error: "validation error"})
    } else {
        const saltPassword = await createHash(req.body.password)
        if (await User.findOne({email: req.body.email})) {
            return res.status(400).json({error: "User with this email is exist"})
        }
        const roles = await Role.find({}, "name _id")
        if(!roles) return res.status(500).json({message:"DB err"})
        const arrOfRole = [roles.filter((item)=> item.name==="USER")[0]["_id"]]

        if (req.body.isAdmin){
            arrOfRole.push(roles.filter((item)=> item.name==="ADMIN")[0]["_id"])
       }


        const newUser = await new User({
            name: req.body.name,
            email: req.body.email.toLowerCase().replace(/\s/g, ''),
            password: saltPassword
        })
        newUser.roles.push(...arrOfRole)

        newUser.save()
            .then(savedUser => res.json(savedUser))
            .catch(error => {
                res.status(500).json({error: 'Failed to create user'});
            });
    }
}


const login = async (req, res) => {
    const email = req.body.email

    const user = await User.findOne({email: email})
    if (!user) {
        return res.status(404).json({error: 'User or password is incorrect'});
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (correctPassword) {
        const  token = jwt.sign({ email: user.email, name:user.name, iat: Math.floor(Date.now() / 60000) - 60}, process.env.JWT_SECRET_KEY, );
        return res.status(200).json({ token});
    } else {
        return res.status(404).json({error: 'User or password is incorrect'});
    }
}

const getUserInfo =  async (req, res) =>{
    return res.status(200).json({title:"good", data:{...req.decode}})
}



module.exports = {
    register, login, getUserInfo
}