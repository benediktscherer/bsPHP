class ApiRequestType {

    public static GET = new ApiRequestType('GET');
    public static POST = new ApiRequestType('POST');
    public static PUT = new ApiRequestType('PUT');
    public static DELETE = new ApiRequestType('DELETE');
    public static PATCH = new ApiRequestType('PATCH');

    private method: string;

    constructor(method: string) {
        this.method = method;
    }

    public toString() {
        return this.method;
    }
}
