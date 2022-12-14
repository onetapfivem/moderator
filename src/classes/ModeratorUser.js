import ApiInterface from "./ApiInterface.js";
class ModeratorUser {
    credentials;
    permissions = [];
    constructor(credentials, permissions) {
        this.credentials = credentials;
        this.permissions = permissions;
    }

    hasPermission(permission) {
        return this.permissions.includes(permission) || this.permissions.includes("*");
    }

    /**
     * Returns the stored session credentials.
     * @returns {Promise<ModeratorUser|undefined>}
     */
    static async fromSession() {
        const credentials = sessionStorage.getItem("credentials");
        if(credentials !== null) {
            const result = await this.load(credentials);
            ApiInterface.headers["Authentication"] = `Basic ${credentials}`;
            return result;
        } throw new Error("No credentials stored in the session.");
    }

    /**
     * Loads a Moderator User from the given encoded credentials.
     * @param credentials
     * @returns {Promise<ModeratorUser>}
     */
    static async load(credentials) {
        let decodedCredentials = atob(credentials);
        if(!decodedCredentials.includes(":") && decodedCredentials.split(":").length === 2) {
            throw new Error("Invalid credentials format.");
        }
        decodedCredentials = decodedCredentials.split(":");
        const response = await ApiInterface.JsonRequest("POST", "/root/validation", JSON.stringify({
            username: decodedCredentials[0],
            password: decodedCredentials[1]
        }));
        if(response.code === 1) {
            return new ModeratorUser(credentials, response.data);
        } throw new Error(response.message);
    }

    /**
     * Loads a Moderator User from the given credentials.
     * @param username
     * @param password
     * @returns {Promise<ModeratorUser>}
     */
    static async login(username, password) {
        let encodedCredentials = btoa(`${username}:${password}`);
        const result = await this.load(encodedCredentials);
        sessionStorage.setItem("credentials", encodedCredentials);
        ApiInterface.headers["Authentication"] = `Basic ${encodedCredentials}`;
        return result;
    }
}
export default ModeratorUser