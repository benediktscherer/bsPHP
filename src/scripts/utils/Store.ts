///<reference path='../VT3000/typings/references.ts' />

class Store {

    /**
     * get item from storage
     *
     * @param name
     * @returns {{}}
     */
    public static getCookie(name: any) {
        let data = jQuery.cookie(app_settings.shortname + '_' + name);

        try {
            return jQuery.parseJSON(data);
        } catch (e) {
            return data;
        }
    };


    /**
     * save item in storage
     * TODO: "expires" in options
     *
     * @param name
     * @param data
     * @param expireDateString
     */
    public static setCookie(name: string, data: any, expireDateString?: string) {
        const expireDate = new Date(expireDateString);

        let values: any = null;

        if (typeof data === 'string') {
            values = data;
        } else {
            values = JSON.stringify(data);
        }

        const options: any = {
            path: '/',
            expires: expireDate
        };

        jQuery.cookie(app_settings.shortname + '_' + name, values, options);
    };


    /**
     * save item in localStorage
     * @param name
     * @param data
     */
    public static setLocalStorage(name: string, data: any) {
        let values: any = null;

        if (typeof data === 'string') {
            values = data;
        } else {
            values = JSON.stringify(data);
        }

        localStorage.setItem(app_settings.shortname + '_' + name, values);
    }


    /**
     * get item from localStorage
     * @param name
     */
    public static getLocalStorage(name: string) {
        try {
            return JSON.parse(localStorage.getItem(app_settings.shortname + '_' + name));
        } catch (e) {
            return false;
        }
    }


    /**
     * remove item from storage
     *
     * @param name
     */
    public static remove(name: string) {
        jQuery.cookie(app_settings.shortname + '_' + name, null, {path: '/'});
    }


    /**
     *
     */
    public static clear() {
        let cookies = jQuery.cookie();
        for (var cookie in cookies) {
            jQuery.removeCookie(cookie, {path: '/'});
        }
    }
}