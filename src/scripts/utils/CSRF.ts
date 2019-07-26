///<reference path='../VT3000/typings/references.ts' />

class CSRF {

    protected api: any;

    /**
     *
     */
    constructor() {
        this.api = new API();
    }


    /**
     *
     */
    public get(): Q.Promise<any> {
        const deferred = Q.defer<any>();

        this.api.get('/csrf', {async: false}).then((response) => {
            if (Assert.hasProperty(response, "token")) {
                return deferred.resolve(response);
            } else {
                return deferred.reject('No Property named "token"');
            }
        });

        return deferred.promise;
    }
}