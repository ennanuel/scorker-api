const axios = require("axios")
const refineResult = require("../refineResult")

const getAllMatches = async (apiURL, headers, filter) => {
    const regex = new RegExp(/(in_play|timed|finished)/i.test(filter) ? filter.toLowerCase() === 'in_play' ? 'in_play|paused' : filter : '[a-z]', 'i')

    try {
        const response =  await axios.get(apiURL + '/matches', { headers })
        const result = response.data.matches.map( elem => refineResult(elem) )
        return result.filter( elem => regex.test(elem.status) )
    } catch (error) {
        throw error
    }
}

module.exports = getAllMatches