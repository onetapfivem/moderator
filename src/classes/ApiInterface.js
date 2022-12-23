import Response from "./Response.js";
class ApiInterface {
    headers = {
        "Accept": "application/json"
    };

    /**
     * Makes a JSON Request to the API.
     * @param method
     * @param endpoint
     * @param dataBody
     * @returns {Promise<Response>}
     * @constructor
     */
    async JsonRequest(method, endpoint, dataBody = null) {
        let response = await fetch(`https://api.onetapfivem.com/v4${endpoint}`, {
            method: method,
            body: dataBody,
            headers: this.headers
        });
        response = await response.json();
        return new Response(response["status"], response["code"], response["message"], response["data"]);
    }

    /**
     * Makes a Basic Request to the API.
     * @param method
     * @param endpoint
     * @param query
     * @returns {Promise<Response>}
     * @constructor
     */
    async Request(method, endpoint, query = "") {
        let response = await fetch(`https://api.onetapfivem.com/v4${endpoint}?${query}`, {
            method: method,
            headers: this.headers
        });
        response = await response.json();
        return new Response(response["status"], response["code"], response["message"], response["data"]);
    }
}
export default new ApiInterface()