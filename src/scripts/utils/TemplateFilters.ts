///<reference path='../VT3000/typings/references.ts' />

class TemplateFilters {

    public registerFilters(env: any): void {

        // fetch translation for string
        env.addFilter('i18n', (str, values) => {
            let i18n = env.getGlobal('i18n');

            if (Assert.hasProperty(i18n, 'data')) {
                let returnValue = i18n.data[str];

                if (Assert.isNotUndefinedNullOrEmpty(returnValue)) {
                    _.each(values, (ele, idx) => {
                        returnValue = returnValue.replace('%' + (idx + 1), ele);
                    });

                    return returnValue;
                } else {
                    console.info('Missing Translation for', i18n.prefix + '-' + str);
                    return "MISSING TRANSLATION";
                }
            }

            console.info('No Translation Available', i18n.prefix + '-' + str);
            return "MISSING TRANSLATION";
        });


        // print out absolute internal path
        env.addFilter('baseUrl', function (path) {
            return app_settings.base_url + path + '.html';
        });


        // print out absolute image src
        env.addFilter('imageSrc', function (imageName) {
            return app_settings.base_url + '/images' + imageName;
        });


        // cut string
        env.addFilter('shorten', function (str, count) {
            return str.slice(0, count || 5);
        });


    }
}