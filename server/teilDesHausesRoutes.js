const express = require('express')
const teilDesHausesRoutes = express.Router()

let teilDesHausesModel = require('./teilDesHauses.model')

teilDesHausesRoutes.route('/add').post(function (req, res) {
    let teil = new teilDesHausesModel(req.body)
    teil.save()
    .then(teil => {
        res.json({'teil': 'teil in added successfully'})
        .catch(err => {
            res.send("unable to save to database")
        })
    })
})

teilDesHausesRoutes.route('/').get(function(req, res) {
    teilDesHausesModel.find(function(err, teil){
        if(err){
            console.log("err")
        }
        else {
            res.json(teil)
        }
    })
})


module.exports = teilDesHausesRoutes