// Require Packages
const express = require ('express')
const ejsLayouts = require('express-ejs-layouts')
const axios = require('axios')
const fs = require('fs')

// Create Ap
const app = express()
const PORT = (process.env.PORT) || 3000

// Set for creating views, use to use ejsLayouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({extended: false}))

// GET data for character based on user input
app.get('/', (req, res) => {
    // Render front page for user to enter character name and server for API Call
    res.render('index')
})   

app.post(`/results`, (req, res) => {
    let charName = req.body.name
    let serverName = req.body.server

    axios.get(`https://xivapi.com/character/search?name=${charName}&server=${serverName}`)
    .then(APIres => {
        let charId = APIres.data.Results[0].ID
        axios.get(`https://xivapi.com/character/${charId}`)
        .then(response => {
            res.render('results', { data: response.data.Character.ClassJobs })
        })    
    }).catch(err => {
        console.log(err)
    })   
}) 

// App.listen
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})