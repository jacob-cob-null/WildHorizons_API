import fs from 'fs'

export function headUtil(res, code, contentType) {
    res.writeHead(code, {
        "Content-Type": contentType
    })
}

export function controllerUtil(data, res, resObject, contentType = "application/json") {
    if (data) {
        headUtil(res, 200, contentType)
        res.end(contentType === "application/json" ? JSON.stringify(resObject) : resObject)
    } else {
        headUtil(res, 404, contentType)
        const notFoundMessage = contentType === "application/json"
            ? JSON.stringify({ message: "Destinations not found" })
            : "Destinations not found"
        res.end(notFoundMessage)
    }
}
