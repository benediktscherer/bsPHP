///<reference path='typings/references.ts' />

class BaseWidget {

    protected config: any;
    protected options: any = null;
    protected api: API = new API();

    protected templatePath: string = app_settings.base_url + '/templates/widgets/';

    constructor(config) {
        this.config = config;
        this.options = jQuery(this.config.container).data();
    }

    public init(): Q.Promise<boolean> {
        throw new Error('init() must be implemented!');
    }


    /**
     * get rendered Template
     *
     * @param templateName
     * @param data
     * @param loadTranslations
     */
    public getTemplate(templateName: string, data?: any, loadTranslations: boolean = true): Q.Promise<JQuery> {
        const deferred = Q.defer<JQuery>();
        const templateUrl = this.templatePath + this.config.templatePath;

        i18n.fetchTranslations(loadTranslations, this.config).then((i18n) => {
            BaseWidget.render(templateUrl, templateName, data, i18n).then((template) => {
                deferred.resolve(template);
            });
        });

        return deferred.promise;
    }


    /**
     * render Template with Nunjucks
     * https://mozilla.github.io/nunjucks/templating.html
     *
     * @param templateUrl
     * @param templateName
     * @param context
     * @param i18n
     */
    private static render(templateUrl, templateName, context, i18n): Q.Promise<JQuery> {
        const deferred = Q.defer<JQuery>();

        let env = nunjucks.configure(templateUrl, {autoescape: true});
        env.addGlobal('i18n', i18n);
        new TemplateFilters().registerFilters(env);

        let template = nunjucks.render(templateName, context);

        deferred.resolve(template);
        return deferred.promise;
    }
}