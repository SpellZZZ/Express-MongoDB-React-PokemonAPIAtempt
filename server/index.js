require('dotenv').config()
const express = require('express')
const cors = require('cors')


const usersRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const tokenVerification = require("./middleware/tokenVerification")
const userRoutes = require("./routes/user")
const app = express()

//middleware
app.use(express.json())
app.use(cors())

//routes with middleware
app.get("/api/users/",tokenVerification)
app.use("/api/user",tokenVerification)


//routes 
app.use("/api/user",userRoutes)
app.use("/api/users",usersRoutes)
app.use("/api/auth",authRoutes)


//laczenie z baza danych
const connection = require('./config/db')
connection()



const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))
