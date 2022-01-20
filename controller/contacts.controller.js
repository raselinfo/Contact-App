const { Contacts } = require("../model/contacts.model")
//* Input Error Handle
const handleError = (name, email, phone) => {
    const error = {}
    if (!name) {
        error.name = "Please Enter Name"
    } if (!email) {
        error.email = "Please Enter Name"
    }
    if (!phone) {
        error.phone = "Please Enter Name"
    }
    return error

}
//* Get All Contacts
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contacts.find()
        res.render("index", { contacts, errors: {} })
    } catch (error) {
        res.status(400).json({
            message: "Data Not Found",
            error: error
        })
    }
}
//* Crate A Contact
exports.createContact = async (req, res) => {
    const { name, email, phone, id } = req.body
    let error = handleError(name, email, phone)
    let isError = Object.keys(error).length > 0
    if (!id) {
        if (!isError) {
            try {
                const contacts = new Contacts({
                    name, email, phone
                })
                let contact = await contacts.save()
                Contacts.find()
                    .then(allContacts => {
                        res.render("index", { contacts: allContacts, errors: {} })
                    })
            } catch (error) {
                console.log(error)
                res.status(404).json({
                    message: "Data Not Created",
                    error: error
                })
            }
        } else {
            const allContacts = await Contacts.find()
            res.render("index", { contacts: allContacts, errors: error })
        }
    } else {
        Contacts.updateOne({ _id: id }, { $set: { name, email, phone } })
            .then(contacts => {
                Contacts.find()
                    .then(contacts => {
                        res.render("index", { contacts, errors: {} })
                    })
            }).catch(error => {
                console.log(error)
                res.status(404).json({
                    message: "Data Not Updated",
                    error: error
                })
            })
    }
}
//* Delate Contact
exports.deleteContact = (req, res) => {
    const { id } = req.params
    Contacts.findByIdAndRemove({ _id: id })
        .then(contact => {
            Contacts.find()
                .then(contacts => {
                    res.render("index", { contacts, errors: {} })
                })
        })
        .catch(async error => {
            console.log(error)
            const contacts = await Contacts.find()
            res.render("index", { contacts, errors: {} })
        })
}