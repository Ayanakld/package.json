const vacancyModel = require("../models/basic_info")
const path = require("path")
const Basic = require("../models/basic_info");

exports.find = (req, res) => {
    vacancyModel.find().sort({createdAt:'desc'})
        .then(vacancies=>{
            res.send(vacancies)
        })
        .catch(err=>{
            res.status(500).send({message: err.message || "Error occurred while looking for a vacancy"})
        })
};

exports.findOne = async (req, res) => {
    try {
        const vacancy = await vacancyModel.findById(req.params.type);
        res.status(200).json(vacancy);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
exports.filterVac = async (req, res) => {
    const {country, industry, job, time, type} = req.body
    let response = 0
    if (industry && !type) {
        response = await Basic.find({
            country,
            industry,
            job,
            time
        })
    }
    if (!industry && type) {
        response = await Basic.find({
            country,
            type,
            job,
            time
        })
    }
    if (industry && type) {
        response = await Basic.find({
            country,
            type,
            job,
            time,
            industry
        })
    }
    if (!industry && !type) {
        response = await Basic.find({
            country,
            job,
            time
        })
    }
    console.log(response)
    res.render(path.resolve("public/html/announcements.ejs"), {news: response})
}
exports.search = async (req, res) => {
    const job = req.body.job
    const response = await Basic.find({job})
    res.render(path.resolve("public/html/announcements.ejs"), {news: response})
}