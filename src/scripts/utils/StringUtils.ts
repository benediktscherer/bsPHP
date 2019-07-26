///<reference path='../VT3000/typings/references.ts' />

class StringUtils {

    /**
     * Capitalize the given string
     *
     * @param str String to capitalize
     * @returns {string} Capitalized string (surprise!)
     */
    public static capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Camelize a given String
     *
     * @param text
     * @param separator
     */
    public static camelize(text: string, separator = '-') {
        const words = text.split(separator);
        const result = [words[0]];
        words.slice(1).forEach((word) => result.push(this.capitalize(word)));

        return result.join('');
    }

    /**
     * Brings down the first letter
     *
     * @param str
     * @returns {string}
     */
    public static firstLetterLowerCase(str: string): string {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }

    /**
     * @see StringUtils.capitalize(str)
     * @param str
     * @returns {string}
     */
    public static firstLetterUpperCase(str: string) {
        return StringUtils.capitalize(str);
    }

    /**
     * Converts a ArrayBuffer to a string
     *
     * @param buffer ArrayBuffer
     * @returns {string}
     */
    public static arrayBufferToString(buffer: ArrayBuffer): string {
        return String.fromCharCode.apply(null, new Uint8Array(buffer));
    }

    /**
     * Generates a random alpha-numeric string with the given length
     *
     * @param length Desired length
     * @returns {string} Random alpha-numeric string
     */
    public static randomString(length: number) {
        if (length < 0) {
            length = 0;
        }

        let random: string = Math.random().toString(36).substring(2);

        if (length > random.length) {
            random += StringUtils.randomString(length - random.length);
        }

        return random.substring(0, length);
    }

    /**
     * Generates a UUID v4
     *
     * http://stackoverflow.com/a/2117523/5779685
     * @returns {string} UUID v4
     */
    public static uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Search for `pattern` in `str` with glob support
     *
     * @example StringUtils.glob("hundkatzemaus", "*katze*") => true;
     * @param str Haystack
     * @param pattern Needle
     * @returns {boolean}
     */
    public static glob(str: string, pattern: string): boolean {
        if (Assert.isUndefinedNullOrEmpty(pattern)) {
            return false;
        }

        return new RegExp("^" + pattern.split("*").join(".*") + "$").test(str);
    }


    /**
     * chop off a string and add three dots if it was chopped
     *
     * @param {string} str
     * @param {number} length
     * @returns {string}
     */
    public static chop(str: string, length: number): string {
        return str.substr(0, length - 1) + (str.length > length ? '&hellip;' : '');
    }
}

// ES6 polyfills
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (pattern) {
        var d = this.length - pattern.length;
        return d >= 0 && this.lastIndexOf(pattern) === d;
    };
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}