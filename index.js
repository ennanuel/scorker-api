const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bp = require('body-parser')

const axios = require('axios')

const authRoute = require('./routes/auth')
const teamRoute = require('./routes/team')
const compRoute = require('./routes/competition')
const playerRoute = require('./routes/player')
const matchRoute = require('./routes/match')
const getTopLeagues = require('./functions/queries/getTopLeagues')
const { compRanking } = require('./data')

dotenv.config()

const app = express();

app.use(
    cors({
        origin: '*'
    })
)

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// app.get(':endpoint([\\/\\w\\.-]*)', async (req, res) => {

    // const config = {
    //     params: {},
    //     headers
    // }

    // for( let [field, value] of Object.entries(req.query) ) {
    //     config.params[field] = value
    // }
// })

// app.use('/auth', authRoute)
// app.use('/team', teamRoute)
app.use('/competition', compRoute)
// app.use('/player', playerRoute)
app.use('/match', matchRoute)

app.listen(process.env.PORT || 4000, () => {
    console.log('server running...')
})