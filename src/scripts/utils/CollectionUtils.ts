///<reference path='../VT3000/typings/references.ts' />

class CollectionUtils {

    /**
     *
     * @param theArray
     * @param label
     * @returns {any}
     */
    public static getItemByLabel(theArray: any[], label: string): Object {
        for (let i in theArray) {
            if (theArray[i].hasOwnProperty("label") && theArray[i].label.toUpperCase() === label.toUpperCase()) {
                return theArray[i];
            }
        }

        return null;
    }

    /**
     *
     * @param theArray
     * @param item
     * @returns {number}
     */
    public static removeItemFromArray(theArray: any[], item: any): number {
        let index = theArray.indexOf(item, 0);

        if (index > -1) {
            theArray.splice(index, 1);
        }

        return index;
    }

    /**
     *
     * @param theArray
     * @param key
     * @returns {null}
     */
    public static getItemByKeyRecursive(theArray: any[], key: string): Object {
        let item = null;

        for (let i in theArray) {
            if (theArray[i].key.toUpperCase() === key.toUpperCase()) {
                item = theArray[i];
                break;
            }
            if (theArray[i].subItems.length > 0) {
                item = CollectionUtils.getItemByKeyRecursive(theArray[i].subItems, key);
                if (item !== null) {
                    break;
                }
            }
        }

        return item;
    }

    /**
     * Returns the size of the object
     *
     * @param obj
     * @returns {number}
     */
    public static getObjectSize(obj: Object): number {
        let size = 0;
        let key;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                size++;
            }
        }

        return size;
    }

    /**
     *
     * @param obj
     */
    public static parseToKeyValueObjectArray(obj: Object): Array<Object> {
        let data: Array<Object> = [];

        _.forOwn(obj, (value, key) => {
            const t = {
                'key': key,
                'value': value
            };

            data.push(t);
        });

        return data;
    }

    /**
     * Object.values(obj) polyfill
     *
     * @param obj
     * @returns {Array}
     */
    public static values(obj: any): any[] {
        const values: any[] = [];

        if (!Assert.isObject(obj)) {
            return values;
        }

        for (let key in obj) {
            if (Assert.hasProperty(obj, key) && obj.propertyIsEnumerable(key)) {
                values.push(obj[key]);
            }
        }

        return values;
    }

    public static serializeObject = function (arr): any {
        var o = {};
        var a = arr.serializeArray();

        jQuery.each(a, (i, el) => {
            if (o[el.name] !== undefined) {
                if (!o[el.name].push) {
                    o[el.name] = [o[el.name]];
                }
                o[el.name].push(el.value || '');
            } else {
                o[el.name] = el.value || '';
            }
        });
        return o;
    };

    public static serializeObjectUriEncoded = function (arr) {
        var o = {};
        var a = arr.serializeArray();
        jQuery.each(a, (i, el) => {
            if (o[el.name] !== undefined) {
                if (!o[el.name].push) {
                    o[el.name] = [o[el.name]];
                }
                o[el.name].push(encodeURIComponent(el.value) || '');
            } else {
                o[el.name] = encodeURIComponent(el.value) || '';
            }
        });
        return o;
    };


    public static serialize = function (obj) {
        var str = [];
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                //str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
        return str.join("&");
    }

}
