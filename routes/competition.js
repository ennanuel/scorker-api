const filterResult = require('../functions/filter')
const getTopLeagues = require('../functions/queries/getTopLeagues')
const router = require('express').Router()

router.get('/', async (req, res) => {
    const { action, limit, option, ...others } = req.query
    const regex = new RegExp(/(in_play|timed|finished)/i.test(option) ? option : '[a-z]', 'i')
    let data = []

    try {
        switch(action) {
            case 'getTopCompetitions': 
                data = await getTopLeagues()
                break;
        }
    } catch (error) {
        return res.status(500).json(error)
    }

    const result = data.length > 0 ? filterResult(data, regex) : data

    return res.status(200).json(/undefined/i.test(limit) ? result : result.slice(0, parseInt(limit)))
})

module.exports = router