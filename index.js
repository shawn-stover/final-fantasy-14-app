// Require Packages
const express = require ('express')
const ejsLayouts = require('express-ejs-layouts')

// Create App
const app = express()
const PORT = (process.env.PORT) || 3000

// Set for creating views, use to use ejsLayouts
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// GET to render front page for user to enter character name and server for API Call
app.get('/', (req, res) => {
    res.render('index')
})

// App.listen
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})