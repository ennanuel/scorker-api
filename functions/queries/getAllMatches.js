const axios = require("axios")
const filterResult = require("../filter")
const refineResult = require("../refineResult")

const getAllMatches = async (apiURL, headers, filter) => {
    const regex = new RegExp(/(in_play|timed|finished)/i.test(filter) ? filter : '[a-z]', 'i')
    let data

    try {
        data =  await axios.get(apiURL + '/matches', { headers })
    } catch (error) {
        throw error
    }

    const result = data.data.matches.map( elem => refineResult(elem) )
    
    return result.filter( elem => regex.test(elem.status) )
}

module.exports = getAllMatches