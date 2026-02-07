import type { IPDestination } from "./types";

export async function sendRequest(methode: string, objectToSend: object, route: string, parameter?: string) {
    try {
        const urlWithoutRoute = getIPWithVersion("Request")
        var url = `${urlWithoutRoute}/${route}`

        const request: RequestInit = {
            method: methode,
            headers: {
                'Content-Type': 'application/json',
            },
        }

        if (methode !== "GET") {
            request.body = JSON.stringify(objectToSend)
        }

        if (parameter) {
            console.log("Fetch: " + parameter)
            const params = new URLSearchParams({ date: parameter}) 
            url = `${url}?${params}`
        }

        const response = await fetch(url, request)

        const data = await response.json()

        if (!response.ok) {
            throw new Error(`HTTP error! ${response.status} - ${response.body}`)
        }

        return data
    }
    catch (err) {
        throw err
    }
}


export function getIPWithVersion(dest: IPDestination) {
    const version = "api/v1"

    const isDev = import.meta.env.DEV;
    if (isDev) {
        const ip = import.meta.env.VITE_WEBSERVER_IP
        const port = import.meta.env.VITE_WEBSERVER_PORT

        return dest === "WebSocket"
            ? `ws://${ip}:${port}/${version}/ws`
            : `http://${ip}:${port}/${version}`
    }

    return dest == "WebSocket"
        ? `ws://${window.location.host}/${version}/ws`
        : `${window.location.protocol}//${window.location.host}/${version}`
}


export function dateToString(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`
}