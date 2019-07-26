///<reference path='../VT3000/typings/references.ts' />

class KeyboardEvents {

    /**
     *
     * @param key
     * @param cb
     */
    public static onKeyUp(key: any, cb: any) {
        let attr: string = (Assert.isNumber(key)) ? 'keyCode' : 'key';

        jQuery(document).keyup((e) => {
            if (e[attr] === key) {
                return cb();
            }
        });
    };
}
