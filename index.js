// Require Packages
const express = require ('express')
const ejsLayouts = require('express-ejs-layouts')
const axios = require('axios')
const fs = require('fs')
const db = require('./models')
const methodOverride = require('method-override')

// Create Ap
const app = express()
const PORT = (process.env.PORT) || 3000

// Set for creating views, use to use ejsLayouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(express.static('public'))

// GET data for character based on user input
app.get('/', (req, res) => {
    let indexTitle = {title: 'Search Your Character'}
    // Render front page for user to enter character name and server for API Call
    res.render('index', indexTitle)
})   

app.post(`/results`, (req, res) => {
    let charName = req.body.name
    let serverName = req.body.server

    axios.get(`https://xivapi.com/character/search?name=${charName}&server=${serverName}`)
    .then(APIres => {
        let charId = APIres.data.Results[0].ID
        db.character.findOrCreate({
            where: { player: charId }})
        axios.get(`https://xivapi.com/character/${charId}`)
        .then(response => {
            // TODO 
            // Get title rendering properly from API 
            // let resultsTitle = {title: `${charName} on ${serverName}`}
            res.render('results', { data: response.data.Character.ClassJobs, img: response.data.Character.Portrait, title: `${charName} on ${serverName}`})
        }).catch(err => {
            console.log(err)
        })       
    }).catch(err => {
        console.log(err)
    })   
}) 

// GET for jobData
app.get('/jobData', async (req, res) => {
    let classData = req.query.classSelect
    const specJob = await db.job.findOne({
        where: {jobName: classData }
    })
    const allNotes = await db.note.findAll({
        where: {jobId: specJob.id}
    })
    res.send(allNotes)
})

// App.listen
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})