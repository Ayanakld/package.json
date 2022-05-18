const mongoose = require('mongoose')
const BasicInfoSchema = new mongoose.Schema(
    {
        country: { type: String, required: false },
        company: {type: String, required: false },
        industry: {type: String, required: false},
        job: {type:String, required: false},
        time: { type: String, required: false},
        type: { type: String, required: false},
        salary: { type: Number , required: false},
            image: { type: String , required: false},
            employees: {type: Number, required: true, default: 1},


    },
    { collection: 'vacancies' }
)
const model = mongoose.model('BasicInfoSchema', BasicInfoSchema)
module.exports = model