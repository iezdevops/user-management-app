const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const morgan = require('morgan')
const bodyparser = require('body-parser')

const connectDB = require('./server/database/connection')

const app = express()

dotenv.config({path:'config.env'})
const PORT = process.env.PORT||8080

//Log request to the console
app.use(morgan('tiny'))

//mongodb connection
connectDB()

//Parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }))

//set view engine
app.set("view engine", "ejs")
// app.set("views", path.resolve(__dirname,"views/ejs"))

//Load assets
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

app.use(express.json())

// Load routes
const Routes = require('./server/routes/router')
app.use(Routes)
// app.use('/', require('./server/routes/router'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})