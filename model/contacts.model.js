const mongoose=require("mongoose")
// Database Schema
const ContactsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
})
// Database Model
const Contacts = mongoose.model("Contacts", ContactsSchema)
module.exports={Contacts}