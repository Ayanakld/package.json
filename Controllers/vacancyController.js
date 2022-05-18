const vacancyModel = require("../models/basic_info")
const path = require("path")

exports.find = (req, res) => {
    vacancyModel.find()
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
