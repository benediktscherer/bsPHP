///<reference path='../../../VT3000/typings/references.ts' />

class TutorialGetParamFromUrlWidget extends BaseWidget {

    public init(): Q.Promise<boolean> {
        const deferred = Q.defer<boolean>();

        const param = Route.getApplicationParam();
        let templateData = {
            base: app_settings.base_url,
            param: param.value
        };

        this.getTemplate("view.html", templateData)
            .then((t: JQuery) => {
                this.config.container.html(t);

                deferred.resolve(true);
            });

        return deferred.promise;
    }
}