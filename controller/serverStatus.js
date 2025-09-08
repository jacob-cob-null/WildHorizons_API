import { controllerUtil } from "../utility/util.js"

// GET /status
export function getStatus(req, res) {
    const status = {
        description: "Wild Horizons API features a wide array of unique and otherworldly destinations",
        status: "ok",
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        timestamp: new Date().toISOString()
    }
    controllerUtil(status, res, status)
}

