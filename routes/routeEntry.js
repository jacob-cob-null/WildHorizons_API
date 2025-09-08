import { parse } from "node:url"

import {
    getDestinations,
    getOpenDestinations,
    getRestrictedDestinations,
    getDestinationByContinent,
    getDestinationByCountry,
    getDestinationByKeyword
} from "../controller/destinationCollection.js"
import { getDestinationbyId, getRandomDestination } from "../controller/destinationItem.js"
import { getStatus } from "../controller/serverStatus.js"

//router setup
export async function routesEntry(req, res) {

    const parsedUrl = parse(req.url, true)
    const urlRoute = parsedUrl.pathname

    //routes

    // GET /destinations
    if (urlRoute == '/destinations' && String(req.method) == 'GET') {
        getDestinations(req, res)
    }
    // GET /destinations/open
    else if (urlRoute == '/destinations/open' && String(req.method) == 'GET') {
        getOpenDestinations(req, res)
    }
    // GET /destinations/open
    else if (urlRoute == '/destinations/random' && String(req.method) == 'GET') {
        getRandomDestination(req, res)
    }
    // GET /destinations/restricted
    else if (urlRoute == '/destinations/closed' && String(req.method) == 'GET') {
        getRestrictedDestinations(req, res)
    }

    // GET /destinations/continent/:continent
    else if (urlRoute.includes('/continent/') && String(req.method) == 'GET') {
        const continent = urlRoute.split('/').pop()
        getDestinationByContinent(continent, req, res)
    }
    // GET /destinations/country/:country
    else if (urlRoute.includes('/country/') && String(req.method) == 'GET') {
        const country = urlRoute.split('/').pop()
        getDestinationByCountry(country, req, res)
    }
    // GET /destinations/country/:country
    else if (urlRoute.includes('/search') && String(req.method) == 'GET') {
        getDestinationByKeyword(parsedUrl.query.q, req, res)
    }

    // /destinations/id
    else if (urlRoute.startsWith('/destinations/')) {
        const id = urlRoute.split('/').pop()

        const method = req.method
        switch (String(method)) {
            case 'PUT':
                console.log('put') //sample only
                break
            case 'DELETE':
                console.log('remove') //sample only
                break
            case 'GET':
                console.log('get')
                if (id) {
                    await getDestinationbyId(id, req, res)
                }
                break
        }
    }
    else if (urlRoute.startsWith('/status') && String(req.method) == 'GET') {
        getStatus(req, res)
    }
    else {
        res.writeHead(400, { "Content-Type": "application/json" })
        res.end("Invalid Route")
    }

}