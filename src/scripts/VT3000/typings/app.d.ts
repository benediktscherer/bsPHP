declare var app_settings: any;

declare var nunjucks: any;
interface nunjucks {
    render(templateName: any, content: any): void;
}

interface NumberConstructor {
    MAX_SAFE_INTEGER: number;
}

interface Document {
    registerElement(tag: string, options?: any);

    selection: any;
}

interface PubSub {
    send(name: string, data: any): void;

    on(name: string, cb: Function): any;
}

// ES6 polyfill
interface String {
    startsWith(searchString: string, position?: number): boolean;

    endsWith(pattern: string): boolean;

    bool(): boolean;
}

// jQuery plugins
interface JQuery {
    openModal(): void;

    closeModal(): void;

    validate(config?: any): void;

    valid(): boolean;

    datepicker(configOrAction?: any, overrideValue?: any): JQuery;

    ellipsis(): void;

    editable(overrideValue?: any): void;

    raty(configOrAction?: any, overrideValue?: any): void;

    chosen(config?: any);

    isotope(data?: any): any;

    tagsinput(data?: any): any;

    tagsinput(method: string, data?: any): any;

    tagsinput(method: string, data?: any, options?: any): any;

    noUiSlider(options: any, rebuild?: boolean): any;

    Raphael(container: any, width: any, height: any): any;

    html5Meter(): any;

    fileupload(config: any, options?: any): void;

    trumbowyg(config: any, options?: any): void;

    autocomplete(config: any): void;

    draggabilly(options?: any): JQuery;

    linkify(options?: any): JQuery;
}