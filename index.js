const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bp = require('body-parser')
const mongoose = require('mongoose')

const authRoute = require('./routes/auth')
const teamRoute = require('./routes/team')
const compRoute = require('./routes/competition')
const playerRoute = require('./routes/player')
const matchRoute = require('./routes/match')

dotenv.config()

const app = express();

app.use(
    cors({
        origin: '*'
    })
)

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

mongoose.set('strictQuery', false)

mongoose
    .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(console.log("Connected to Database."))
    .catch((err) => console.log(err))


// app.get(':endpoint([\\/\\w\\.-]*)', async (req, res) => {

    // const config = {
    //     params: {},
    //     headers
    // }

    // for( let [field, value] of Object.entries(req.query) ) {
    //     config.params[field] = value
    // }
// })

app.use('/auth', authRoute)
app.use('/team', teamRoute)
app.use('/competition', compRoute)
app.use('/player', playerRoute)
app.use('/match', matchRoute)

app.listen(process.env.PORT || 4000, () => {
    console.log('Backend running.')
})