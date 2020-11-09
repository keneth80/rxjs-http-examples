module.exports = class Response {
    constructor(
        status = '',
        statusText = '',
        data = {}
    ) {
        Object.assign(this, {
            status,
            statusText,
            data
        });
    }

    static clone({
        status, statusText, data
    }) {
        return new Response(status, statusText, data);
    }
}