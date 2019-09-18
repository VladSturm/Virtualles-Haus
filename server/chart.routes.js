const express = require('express')
const ChartRoutes = express.Router()

let ChartModel = require('./chart.model')

ChartRoutes.route('/add').post(function (req, res) {
    let chart = new ChartModel(req.body)
    chart.save()
    .then(chart => {
        res.json({'chart': 'chart in added successfully'})
        .catch(err => {
            res.send("unable to save to database")
        })
    })
})

ChartRoutes.route('/').get(function(req, res) {
    ChartModel.find(function(err, teil){
        if(err){
            console.log("err")
        }
        else {
            res.json(teil)
        }
    })
})


module.exports = ChartRoutes