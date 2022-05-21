const mongoose = require('mongoose')
const BasicInfoSchema = new mongoose.Schema(
    {
        country: { type: String, required: true },
        company: {type: String, required: true },
        industry: {type: String, required: true},
        job: {type:String, required: true},
        time: { type: String, required: true},
        type: { type: String, required: true},
        salary: { type: Number , required: true},
        image: { type: String , required: true},
        employees: {type: Number, required: true, default: 1},
        description:{type: String, required: true},
            createdAt:{
                type:Date,
                default: Date.now
            }

    },
    { collection: 'vacancies' }
)
const model = mongoose.model('BasicInfoSchema', BasicInfoSchema)
module.exports = model