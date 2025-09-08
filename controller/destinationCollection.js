import { headUtil, controllerUtil } from "../utility/util.js";
import { getData } from "../database/dataFetcher.js";

// GET /destinations
export async function getDestinations(req, res) {
    const data = await getData()
    controllerUtil(data, res, data)
}

// GET /destinations/open
export async function getOpenDestinations(req, res) {
    const data = await getData()
    const filteredDestination = data.filter(destination => destination.is_open_to_public === true)
    controllerUtil(data, res, filteredDestination)
}
// GET /destinations/restricted
export async function getRestrictedDestinations(req, res) {
    const data = await getData()
    const filteredDestination = data.filter(destination => destination.is_open_to_public === false)
    controllerUtil(data, res, filteredDestination)
}

// GET /destinations/continent/:continent
export async function getDestinationByContinent(continent, req, res,) {
    const data = await getData()
    const filteredDestination = data.filter(destination => destination.continent.toLowerCase() == continent.toLowerCase())
    controllerUtil(data, res, filteredDestination)
}
// GET /destinations/country/:country
export async function getDestinationByCountry(country, req, res,) {
    const data = await getData()
    const filteredDestination = data.filter(destination => destination.country.toLowerCase() == country.toLowerCase())
    controllerUtil(data, res, filteredDestination)
}

// GET /destinations/search?q=keyword
export async function getDestinationByKeyword(keyword, req, res) {
    const data = await getData();
    const lowerKeyword = keyword.toLowerCase();

    // filter destinations
    const similarDestinations = data.filter(destination => {
        return Object.values(destination).some(value => {
            if (typeof value === "string") {
                return value.toLowerCase().includes(lowerKeyword);
            }
            if (typeof value === "number" || typeof value === "boolean") {
                return value.toString().includes(lowerKeyword);
            }
            if (Array.isArray(value)) {
                return value.some(item =>
                    Object.values(item).some(innerVal =>
                        typeof innerVal === "string" &&
                        innerVal.toLowerCase().includes(lowerKeyword)
                    )
                );
            }
            return false;
        });
    });
    controllerUtil(data, res, similarDestinations)
}
