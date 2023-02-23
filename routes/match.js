const axios = require('axios')
const router = require('express').Router()
const { headers } = require('../data/')
const getAllMatches = require('../functions/queries/getAllMatches')

router.get('/', async (req, res) => {
    const { action, option, ...others } = req.query
    const apiURL = process.env.FOOTBALL_API_URL
    let data = []

    try {
        switch (action) {
            case 'getAllMatches':
                data = await getAllMatches(apiURL, headers, option)
                break;
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

    return res.status(200).json(data)
})

module.exports = router