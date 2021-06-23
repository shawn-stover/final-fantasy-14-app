// Require Packages
const express = require ('express')
const ejsLayouts = require('express-ejs-layouts')
const axios = require('axios')
const fs = require('fs')
const db = require('./models')
const methodOverride = require('method-override')

// Create App
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
        const charId = APIres.data.Results[0].ID
        db.character.findOrCreate({
            where: { player: charId }})  
        axios.get(`https://xivapi.com/character/${charId}`)
        .then(response => {
            // TODO 
            // Get title rendering properly from API 
            // let resultsTitle = {title: `${charName} on ${serverName}`}
            res.render('results', { data: response.data.Character.ClassJobs, charId: APIres.data.Results[0].ID, img: response.data.Character.Portrait, title: `${charName} on ${serverName}`})
        }).catch(err => {
            console.log(err)
        })       
    }).catch(err => {
        console.log(err)
    })   
}) 

// GET for jobData
app.get('/jobData', (req, res) => {
    let classData = req.query.classSelect
    db.job.findOrCreate({
        where: { 
            characterId: req.query.char,    
            jobName: classData 
        }}).then(job => {
            db.note.findAll({
                where: {
                    jobId: job[0].dataValues.id
                }
            }).then(response => {
                res.render('jobData', { data: response, classData: classData})
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })      
})

// GET for genData
// app.get('/genData', (req, res) => {
//     db.job.findOrCreate({
//         where: { 
//             characterId: req.query.char,
//         }}).then(job => {
//             db.note.findAll({
//                 where: {
//                     jobId: job[0].dataValues.id
//                 }
//             }).then(response => {
//                 res.render('jobData', { data: response[0].dataValues.content, classData: req.query.classSelect})
//             }).catch(err => {
//                 console.log(err)
//             })
//         }).catch(err => {
//             console.log(err)
//         })      
// })

app.delete('/jobData', (req, res) => {
    console.log(req.body)
    console.log(req.params)
    console.log(req.query)
    res.send('ROUTE HIT')
    console.log(req.query.id)
    db.note.destroy({
        where: {noteId: req.query.id}
    })
    res.redirect('/jobData')
})

app.post('/addNote', (req, res) => {
    console.log(req.body.characterId, req.body.jobId, req.body.noteField)
    let content = (req.body.noteField).toString()
    db.note.create({
        where: {
            characterId: req.body.characterId,
            jobId: req.body.jobId,
            content: content
        }
    })
    //res.redirect to /jobData with new note added
    res.send('ADD NOTE HIT')
})

// App.listen
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})