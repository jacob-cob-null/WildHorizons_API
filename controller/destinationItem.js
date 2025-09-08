import { controllerUtil } from "../utility/util.js";
import { getData } from "../database/dataFetcher.js";

// GET /destinations/id 
export async function getDestinationbyId(id, req, res) {
    const data = await getData()
    const destination = data.find((item) => item.id === Number(id))
    controllerUtil(data, res, destination)
}
// GET /destination/random
export async function getRandomDestination(req, res) {
    const data = await getData()
    const num = Math.floor(Math.random() * data.length)
    const destination = data[num]
    controllerUtil(data, res, destination)
}