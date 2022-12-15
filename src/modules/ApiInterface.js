import Response from "./Response.js";
class ApiInterface {
    headers = {};

    async JsonRequest(method, endpoint, dataBody = null) {
        let response = await fetch(`https://api.onetapfivem.com/v4${endpoint}`, {
            method: method,
            body: dataBody,
            headers: this.headers
        });
        response = await response.json();
        return new Response(response["status"], response["code"], response["message"], response["data"]);
    }
    async Request(method, endpoint, query = null) {
        let response = await fetch(`https://api.onetapfivem.com/v4${endpoint}/?${query}`, {
            method: method,
            headers: this.headers
        });
        response = await response.json();
        return new Response(response["status"], response["code"], response["message"], response["data"]);
    }
}
export default new ApiInterface()