const filterResult = require('../functions/filter')
const getCompetitions = require('../functions/queries/getCompetitions')
const getTopLeagues = require('../functions/queries/getTopLeagues')
const router = require('express').Router()

router.get('/', async (req, res) => {
    const { action, limit, option, ...others } = req.query
    const regex = new RegExp(/(in_play|timed|finished)/i.test(option) ? option.toLowerCase() === 'in_play' ? 'in_play|paused' : option : '[a-z]', 'i')
    let data = []

    try {
        switch(action) {
            case 'getTopCompetitions': 
                const dat = await getTopLeagues()
                data = filterResult(dat, regex)
                const result = /undefined/i.test(limit) ? data : data.slice(0, parseInt(limit))
                return res.status(200).json(result)
            case 'getCompetitions':
                console.log('please wait...')
                data = await getCompetitions()
                return res.status(200).json(data);
            default: 
                return res.status(404).json({message: 'Please return a valid "action" parameter'})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

module.exports = router