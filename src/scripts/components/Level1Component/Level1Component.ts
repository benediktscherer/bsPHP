///<reference path='../../VT3000/typings/references.ts' />

class Level1Component extends BaseComponent {

    public init(): Q.Promise<boolean> {
        const deferred = Q.defer<boolean>();

        this.handleContent();

        deferred.resolve(true);
        return deferred.promise;
    }


    /**
     * fetch data from endpoint and render template
     */
    public handleContent() {

        this.api.get('/users').then((response) => {
            let templateData: any = {
                data: response.slice(0, 4)
            };

            this.getTemplate("view.html", templateData).then((t: JQuery) => {
                this.config.container.append(t);
                this.bind();
            });
        });
    }
}