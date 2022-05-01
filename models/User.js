const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        surname: {type: String, required: true },
        email: {type: String, required: true, unique: true},
        date: {type: Date, required: true,Default:Date.now()},
        password: { type: String, required: true}
    },
    { collection: 'users' }
)
const model = mongoose.model('UserSchema', UserSchema)
module.exports = model