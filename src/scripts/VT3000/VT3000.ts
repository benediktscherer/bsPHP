///<reference path='typings/references.ts' />

class VT3000 {

    static instance: VT3000 | null = null;

    protected elements: any = {
        module: 'vt-module',
        component: 'vt-component',
        widget: 'vt-widget'
    };

    public init() {
        this.registerElements();
        this.fetchElementsFromDom();
    }

    public static getInstance() {
        if (Assert.isUndefinedNullOrEmpty(VT3000.instance)) {
            VT3000.instance = new VT3000();
        }
        return VT3000.instance;
    }

    /**
     * IE
     */
    private registerElements() {
        if (Assert.isFunction(document.releaseEvents)) {
            document.registerElement('vt-module', VAModuleElement);
            document.registerElement('vt-component', VAComponentElement);
            document.registerElement('vt-widget', VAWidgetElement);
        }

        /*
        TODO: new one!
        https://github.com/webcomponents/webcomponentsjs#custom-elements-es5-adapterjs
        https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define

        customElements.define('vt-module', VAModuleElement);
        customElements.define('vt-component', VAComponentElement);
        customElements.define('vt-widget', VAWidgetElement);
        */
    }


    /**
     * Find Components in DOM or in vt-element
     * TODO: need to be async?
     */
    public fetchElementsFromDom(target?: string) {
        let $parentElement = jQuery('body');
        if (Assert.isNotUndefinedNullOrEmpty(target)) {
            $parentElement = jQuery(target);
        }

        jQuery.each(this.elements, (type, VTElement) => {
            let elementsInDom = $parentElement.find(VTElement);

            if (elementsInDom.length > 0) {
                jQuery.each(elementsInDom, (i, element) => {
                    const $element = jQuery(element);
                    const elementName = $element.attr('name');

                    this.registerElement(type, elementName, $element);
                });
            }
        });
    }


    /**
     * Register VTElement & run Class
     * @param type
     * @param elementName
     * @param $element
     */
    public registerElement(type, elementName, $element) {
        if ($element.hasClass(type + "-container")) {
            return;
        }

        const config = this.buildConfig(type, elementName, $element);

        function isConstructor(f) {
            try {
                new f();
            } catch (err) {
                if (err.message.indexOf('is not a constructor') >= 0) {
                    console.error('Unable to Init Element: ', config.className);
                    return false;
                }
            }
            return true;
        }

        if (isConstructor(window[config.className])) {
            if (Route.getUrlParam('log')) {
                console.info('Find ' + type, config);
            }

            $element.addClass(type + '-container').attr('data-uuid', config.uuid);
            let vtElementClass = new window[config.className](config);
            vtElementClass.init();
        }
    }


    /**
     * build component config
     * @param type
     * @param elementName
     * @param $element
     */
    private buildConfig(type, elementName, $element) {
        return {
            uuid: StringUtils.uuid(),
            className: this.getClassName(elementName) + StringUtils.capitalize(type),
            templatePath: elementName + StringUtils.capitalize(type),
            name: elementName,
            container: $element,
            type: type,
            options: $element.data()
        };
    }


    /**
     * get ClassName for Component, Widget etc
     * @param elementName
     */
    private getClassName(elementName) {
        let className: string = elementName;

        if (elementName.indexOf('/') > 0) {
            let fullClassName = '';
            elementName.split('/').forEach(p => fullClassName += StringUtils.capitalize(p));

            className = fullClassName;
        }

        return className;
    }
}