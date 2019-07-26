///<reference path='../typings/references.ts' />

class API {
    /**
     *
     * @param method
     * @param uri
     * @param data
     * @param requestOptions
     * @returns {Promise<*>}
     */
    private makeRequest(method: ApiRequestType, uri: string, data: any, requestOptions?: any): Q.Promise<any> {
        const deferred = Q.defer<any>();

        let url: string = '';
        if (uri.startsWith('https://')) {
            url = uri;
        } else if (Assert.isUndefinedNullOrEmpty(app_settings.api_url)){
            url = app_settings.base_url + '/dummy-api' + uri + '.json';
        } else {
            url = app_settings.api_url + uri;
        }

        const options = {
            'url': url,
            'type': method.toString(),
            'cache': false,
            'dataType': 'json',
            'beforeSend': () => {
                /*
                console.log('send data', {
                    uuid: StringUtils.uuid(),
                    type: method.toString(),
                    url: url,
                    timer: {
                        start: new Date().getTime(),
                        end: null
                    }
                });
                */
            },
            'success': (data: any) => {
                return deferred.resolve(data);
            },
            'error': (xhr: JQueryXHR, textStatus: string, errorThrown: string) => {
                const rejectionContext: any = {
                    "xhr": xhr,
                    "textStatus": textStatus,
                    "errorThrown": errorThrown,
                    "responseJson": xhr.responseJSON
                };

                return deferred.reject(rejectionContext);
            }
        };

        if (data) {
            options['contentType'] = 'application/json; charset=utf-8';

            if (typeof data === 'string') {
                options['data'] = data;
            } else {
                options['data'] = JSON.stringify(data);
            }
        }

        $.extend(options, requestOptions);
        $.ajax(options.url, options);

        return deferred.promise;
    }

    /**
     *
     * @param uri
     * @param requestOptions
     * @param paramData
     * @returns {Q.Promise<any>}
     */
    public get(uri: string, requestOptions?: any, paramData?: any): Q.Promise<any> {
        let param: string = '';

        if (Assert.isObject(paramData)) {
            param += '?';
            for (let key in paramData) {
                param += encodeURIComponent(key) + '=' + encodeURIComponent(paramData[key]) + '&';
            }
        }

        return this.makeRequest(ApiRequestType.GET, uri + param.slice(0, -1), null, requestOptions);
    }


    /**
     *
     * @param uri
     * @param data
     * @param requestOptions
     * @returns {Q.Promise<any>}
     */
    public post(uri: string, data: any, requestOptions?: any): Q.Promise<any> {
        return this.makeRequest(ApiRequestType.POST, uri, data, requestOptions);
    }


    /**
     *
     * @param uri
     * @param data
     * @param requestOptions
     * @returns {Q.Promise<any>}
     */
    public put(uri: string, data: any, requestOptions?: any): Q.Promise<any> {
        return this.makeRequest(ApiRequestType.PUT, uri, data, requestOptions);
    }


    /**
     *
     * @param uri
     * @param data
     * @param requestOptions
     * @returns {Q.Promise<any>}
     */
    public delete(uri: string, data: any, requestOptions?: any): Q.Promise<any> {
        return this.makeRequest(ApiRequestType.DELETE, uri, data, requestOptions);
    }


    /**
     *
     * @param uri
     * @param data
     * @param requestOptions
     * @returns {Q.Promise<any>}
     */
    public patch(uri: string, data?: any, requestOptions?: any): Q.Promise<any> {
        return this.makeRequest(ApiRequestType.PATCH, uri, data, requestOptions);
    }
}

interface AjaxResponse {
    context: any[],
    success: boolean,
    error: string
}