///<reference path='../typings/references.ts' />

class i18n {

    protected static languagePath: string = app_settings.base_url + '/languages/';

    /**
     * fetch translations
     *
     * @param loadTranslations
     * @param elementConfig
     */
    public static fetchTranslations(loadTranslations: boolean, elementConfig: any): Q.Promise<object> {
        const deferred = Q.defer<object>();

        if (loadTranslations) {
            const translationPrefix = i18n.getTranslationPrefix(elementConfig);
            let lang = Store.getCookie('lang') || 'de';

            if (Route.getUrlParam('lang')) {
                lang = Route.getUrlParam('lang');
            }

            jQuery.getJSON(i18n.languagePath + lang + '.json', (json) => {
                if (Assert.isNotUndefinedNullOrEmpty(json[translationPrefix])) {

                    deferred.resolve({
                        data: json[translationPrefix],
                        lang: lang,
                        prefix: translationPrefix
                    });
                } else {
                    deferred.resolve({
                        lang: lang,
                        prefix: translationPrefix
                    });
                }
            }).fail(function (e) {
                console.error('Missing Translationfile', e);
                deferred.resolve({});
            });
        } else {
            deferred.resolve({});
        }

        return deferred.promise;
    }


    /**
     *
     * @param key
     * @param elementConfig
     */
    public static getTranslation(key: string, elementConfig: any): Q.Promise<string> {
        const deferred = Q.defer<string>();

        this.fetchTranslations(true, elementConfig)
            .then((translations) => {
                deferred.resolve(translations['data'][key]);
            });

        return deferred.promise;
    }


    /**
     * get translation prefix
     * eg "component-subgroup-level1"
     *
     * @param elementConfig
     */
    private static getTranslationPrefix(elementConfig: any) {
        let customPrefix = '';
        if (Assert.hasProperty(elementConfig.options, 'i18n')) {
            customPrefix = elementConfig.options['i18n'] + '-';
        }

        const translationPrefix = elementConfig.name.replace(new RegExp('/', 'g'), '-').toLowerCase();
        return customPrefix + elementConfig.type + '-' + translationPrefix;
    }
}