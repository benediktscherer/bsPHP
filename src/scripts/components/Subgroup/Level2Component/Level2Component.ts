///<reference path='../../../VT3000/typings/references.ts' />

class SubgroupLevel2Component extends BaseComponent {

    public init(): Q.Promise<boolean> {
        const deferred = Q.defer<boolean>();

        this.getTemplate("view.html", {}).then((t: JQuery) => {
            this.config.container.html(t);
            this.bind();

            deferred.resolve(true);
        });

        return deferred.promise;
    }
}