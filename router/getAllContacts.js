const { getAllContacts, createContact, deleteContact } = require("../controller/contacts.controller")
const router = require("express").Router()

router.get("/", getAllContacts)
router.get("/deleteContact/:id", deleteContact)
router.post("/",createContact)
module.exports = { contactsRouter: router }