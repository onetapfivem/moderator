class Response {
    status;
    code;
    message;
    data;
    constructor(status, code, message, data = []) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
export default Response