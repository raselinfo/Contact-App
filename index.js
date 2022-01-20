require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const ejs = require("ejs")
const { contactsRouter } = require('./router/getAllContacts')
const app = express()
const PORT = process.env.PORT || 4000
// Middleware
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine", "ejs")
// All Routers
app.use(contactsRouter)

// Database Connection
mongoose.connect("mongodb://localhost:27017/contactdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    // Server Listen
    app.listen(PORT, () => {
        console.log(`Server is Running at http://localhost:${PORT}`)
    })
}).catch((err) => {
    console.log("Error Happend",err)
})
