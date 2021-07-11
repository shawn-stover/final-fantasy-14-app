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
    let jobId = req.body.jobId
    let charId = req.body.charId
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
                res.render('jobData', { data: response, classData: classData, jobId: jobId, characterId: charId})
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })      
})

// GET for genData (TODO After Cohort)
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
    let charId = req.body.characterId
    let className = req.body.className
    db.note.destroy({
        where: {id: req.body.noteId}
    })
    res.redirect(`/jobData?classSelect=${className}&char=${charId}`)
})

app.post('/addNote', (req, res) => {
    let charId = req.body.characterId 
    let jobId = req.body.jobId
    let className = req.body.className
    let content = (req.body.noteField).toString()
    db.note.create({
        characterId: charId,
        jobId: jobId,
        content: content
    })
    //res.redirect to /jobData with new note added
    res.redirect(`/jobData?classSelect=${className}&char=${charId}`)
})

app.get('/jobData/edit/', (req, res) => {
    let noteId = req.query.noteId
    let charId = req.body.characterId
    let jobId = req.body.jobId
    let className = req.body.className
    db.note.findOne({
        where:
            {id: noteId}
    })
    .then(note => {
        console.log(note)
        res.render('edit', {note: note})
    })
})

app.put('/jobData/edit/:id', (req, res) => {
    let noteId = req.query.noteId
    let charId = req.body.characterId
    let className = req.body.className
    db.note.update({ 
        content: req.body.updateNote
    }, {
        where: {id: noteId}
    })
    // Redirect to notes page with updated note
    res.redirect(`/jobData?classSelect=${className}&char=${charId}`)
})

// App.listen
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})