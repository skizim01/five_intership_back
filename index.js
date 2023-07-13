const express = require('express')
const app = express()
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes")
const roleRoutes = require("./routes/roleRoutes")

const bodyParser = require('body-parser')

const port = 3000


require('dotenv').config()
mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    console.log('Connected to Mongodb');
}).catch(error => {
    console.error('MongoDB connection error:', error);
});
app.use(bodyParser.json())

app.use('/user/',userRoutes)
app.use('/role/',roleRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})