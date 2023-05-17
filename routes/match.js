const axios = require('axios')
const router = require('express').Router()
const { headers } = require('../data/')
const getAllMatches = require('../functions/queries/getAllMatches')
const saveMatches = require('../functions/queries/saveMatches')
const getPicks = require('../functions/queries/getPicks')
const updateMatches = require('../functions/queries/updateMatches')
const getMatches = require('../functions/queries/getMatches')


router.get('/', async (req, res) => {
    const { action, option, next, ...others } = req.query
    const apiURL = process.env.FOOTBALL_API_URL
    let data = []

    try {
        switch (action) {
            case 'getAllMatches':
                data = await getAllMatches(apiURL, headers, option)
                break;
            case 'getMatches':
                data = await getMatches();
                break;
            case 'getPicks':
                data = await getPicks(apiURL, headers, next || 1)
                break;
            case 'saveMatches':
                data = await saveMatches()
                break;
            case 'updateMatches':
                data = await updateMatches()
                break;
            default: 
                return res.status(404).json({message: 'please use a valid "action" query!'})
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }

    return res.status(200).json(data)
})

module.exports = router