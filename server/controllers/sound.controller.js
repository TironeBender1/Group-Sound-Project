const { response } = require("express");
const Sound = require("../models/Sound.model");

module.exports = {
    allSounds: (req,res) => {
        Sound.find()
            .then((allSounds) => {
                console.log(allSounds)
                res.json(allSounds)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    getOneSound: (req, res) => {
        Sound.findOne({ _id: req.params.id})
            .then((oneSound) => {
                res.json(oneSound)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    
    updateSound: (req, res) => {
        // console.log('PARAMS*********', req.params)
        Sound.findOneAndUpdate( { _id: req.params.id } ,req.body, { new: true, runValidators: true } )
            .then(updatedSound => {
                res.json(updatedSound)
            })
            .catch((err) => {
                res.status(500).json(err)
            });
    },
    deleteSound: (req, res) => {
        Sound.deleteOne({_id: req.params.id})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
        },
        
    createSound: (req, res) => {
        Sound.create(req.body)
        .then((newSound) => {console.log('newSound', newSound); res.json(newSound)})
        .catch((err) => res.status(500).json(err))
    }
};