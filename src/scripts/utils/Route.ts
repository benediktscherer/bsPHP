///<reference path='../VT3000/typings/references.ts' />

class Route {

    /**
     * get Url GET Parameter
     * {{ ?[name]=result }}
     *
     * @param name
     */
    public static getUrlParam(name) {
        let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (Assert.isUndefinedNullOrEmpty(results)) {
            return null;
        } else {
            return decodeURI(results[1]);
        }
    }


    /**
     * * get Url Param
     * {{ /detail/result }}
     *
     */
    public static getApplicationParam() {
        const HTTPHeaders = Route.getHTTPHeaders();
        const paramName = 'x-application-parameters';

        let result: any = {};

        for (let header in HTTPHeaders) {
            if (Assert.hasProperty(HTTPHeaders, header) && header === paramName) {
                let string = HTTPHeaders[header];
                let split = string.split('=');

                result['key'] = split[0];
                result['value'] = split[1].substring(0, split[1].length - 1);
            }
        }

        return result;
    }


    /**
     *
     */
    public static getHTTPHeaders() {
        const client = new XMLHttpRequest();
        client.open('GET', window.location.href, false);
        client.send(null);

        let header: any = {};

        let raw = client.getAllResponseHeaders().toLowerCase();
        let split = raw.split('\n');
        for (let i = 0; i < split.length; i++) {
            let item = split[i];
            let key = item.substring(0, item.indexOf(':'));

            if (Assert.isNotUndefinedNullOrEmpty(key)) {
                header[key] = item.substring(item.indexOf(':') + 2);
            }
        }

        return header;
    }


    /**
     * route to internal page
     *
     * @param path
     * @param options
     */
    public static to(path, options?: any) {
        let param: string = '';

        if (Assert.isObject(options)) {
            param += '?';
            for (let key in options) {
                param += encodeURIComponent(key) + '=' + encodeURIComponent(options[key]) + '&';
            }
        }

        return app_settings['base_url'] + path + param.slice(0, -1);
    }


    /**
     * route to api page
     *
     * @param path
     */
    public static toApi(path) {
        return app_settings['api_url'] + path;
    }


    /**
     *
     * @param path
     */
    public static is(path) {
        return window.location.pathname === path;
    }
}