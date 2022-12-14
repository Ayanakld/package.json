const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
    {
        name: {
                type: String,
                required: true
        },
        surname: {
                type: String,
                required: true
        },
        email: {
                type: String,
                required: true,
                unique: true
        },
        date: {
                type: String,
                required: true
        },
        password: {
                type: String,
                required: true
        },
            gender: {
                type: Boolean
            },
            phone: {
                type: String,
                    unique: true
        },
            address: {
                type:String
            },
            site: {
                type: String
            }
    },
    { collection: 'users' }
)
const model = mongoose.model('UserSchema', UserSchema)
module.exports = model