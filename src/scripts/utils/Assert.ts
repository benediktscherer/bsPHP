///<reference path='../VT3000/typings/references.ts' />

class Assert {

    public static readonly MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

    public static readonly UNDEFINED_TYPE = "undefined";
    public static readonly OBJECT_TYPE = "object";
    public static readonly NUMBER_TYPE = "number";
    public static readonly STRING_TYPE = "string";
    public static readonly FUNCTION_TYPE = "function";
    public static readonly BOOLEAN_TYPE = "boolean";
    public static readonly SYMBOL_TYPE = "symbol";

    /**
     * Checks if the given object is undefined, null or empty
     *
     * @param obj Object to check
     * @returns {boolean}
     */
    public static isUndefinedNullOrEmpty(obj: any): boolean {
        return Assert.isUndefined(obj) || Assert.isNull(obj) || Assert.isEmpty(obj);
    }

    /**
     * Checks if the given object is _NOT_ undefined, null or empty
     *
     * @param obj
     * @returns {boolean}
     */
    public static isNotUndefinedNullOrEmpty(obj: any): boolean {
        return !Assert.isUndefinedNullOrEmpty(obj);
    }

    /**
     * Checks if the given object is not null
     *
     * @param obj
     * @returns {boolean}
     */
    public static nonNull(obj: any): boolean {
        return !Assert.isNull(obj);
    }

    /**
     * Checks if the given object is empty
     *
     * @param obj
     * @returns {boolean}
     */
    public static isEmpty(obj: any): boolean {
        if (Assert.isNull(obj)) {
            return true;
        }

        if (Assert.isOfType(obj, Assert.OBJECT_TYPE) && !Assert.isArray(obj)) {
            return CollectionUtils.getObjectSize(obj) <= 0;
        } else if (Assert.isOfType(obj, Assert.NUMBER_TYPE)) {
            return obj <= 0;
        } else if (Assert.isOfType(obj, Assert.FUNCTION_TYPE)) {
            return false;
        }

        return obj.length <= 0;
    }

    /**
     * Checks if the given object is not empty
     *
     * @param obj
     * @returns {boolean}
     */
    public static isNotEmpty(obj: any): boolean {
        return !Assert.isEmpty(obj);
    }

    /**
     * Checks if the given object has a function with the given name
     *
     * @param obj
     * @param functionName
     * @returns {boolean}
     */
    public static hasFunction(obj: any, functionName: string) {
        return Assert.nonNull(obj) && Assert.isOfType(obj[functionName], Assert.FUNCTION_TYPE);
    }

    /**
     * Checks if the given object is of the expected type
     *
     * @param obj
     * @param expectedType
     * @returns {boolean}
     */
    public static isOfType(obj: any, expectedType): boolean {
        return typeof obj === expectedType;
    }

    /**
     * Checks if the given object is a instance of the given type
     *
     * @param obj
     * @param type
     * @returns {boolean}
     */
    public static isInstanceOf(obj: any, type: any) {
        return obj instanceof type;
    }

    /**
     * Checks if the given object is a safe integer
     *
     * From https://mdn.io/Number/isSafeInteger
     *
     * @param obj
     * @returns {boolean}
     */
    public static isSafeInteger(obj: any): boolean {
        if (!Assert.isNumber(obj) || Assert.isFloat(obj)) {
            return false;
        }

        return obj >= -Assert.MAX_SAFE_INTEGER && obj <= Assert.MAX_SAFE_INTEGER
    }

    /**
     * Checks if the given property exists in the object
     *
     * @param obj
     * @param property
     * @returns {boolean}
     */
    public static hasProperty(obj: any, property: string): boolean {
        if (Assert.isUndefinedNullOrEmpty(obj)) {
            return false;
        }

        if (Assert.isArray(obj)) {
            return false;
        }

        return obj.hasOwnProperty(property);
    }

    // -- Primitive checks

    /**
     * Checks if the given object is undefined
     *
     * @param obj
     * @returns {boolean}
     */
    public static isUndefined(obj: any): boolean {
        return Assert.isOfType(obj, Assert.UNDEFINED_TYPE);
    }

    /**
     * Checks if the given object is null
     *
     * @param obj
     * @returns {boolean}
     */
    public static isNull(obj: any): boolean {
        if (Assert.isUndefined(obj)) {
            return true;
        }

        return obj === null;
    }

    /**
     * Checks if the given object is array-like
     *
     * @param obj
     * @returns {boolean}
     */
    public static isArrayLike(obj: any): boolean {
        return Assert.nonNull(obj) && Assert.hasLength(obj) && !Assert.isFunction(obj);
    }

    /**
     * Checks if the given object is a array
     *
     * @param obj
     * @returns {boolean}
     */
    public static isArray(obj: any): boolean {
        return Array.isArray(obj);
    }

    /**
     * Checks if the given object is a function
     *
     * @param obj
     * @returns {boolean}
     */
    public static isFunction(obj: any): boolean {
        return Assert.nonNull(obj) && Assert.isOfType(obj, Assert.FUNCTION_TYPE);
    }

    /**
     * Checks if the given object has a length
     *
     * @param obj
     * @returns {boolean}
     */
    public static hasLength(obj: any): boolean {
        return Assert.nonNull(obj.length);
    }

    /**
     * Checks if the given object is a object
     *
     * @param obj
     * @returns {boolean}
     */
    public static isObject(obj: any): boolean {
        return Assert.isOfType(obj, Assert.OBJECT_TYPE) && !Assert.isArray(obj) && Assert.hasFunction(obj, "hasOwnProperty");
    }

    /**
     * Checks if the given object is a boolean
     *
     * @param obj
     * @returns {boolean}
     */
    public static isBoolean(obj: any): boolean {
        return Assert.isOfType(obj, Assert.BOOLEAN_TYPE);
    }

    /**
     * Checks if the given object is a number
     *
     * @param obj
     * @returns {boolean}
     */
    public static isNumber(obj: any): boolean {
        return Assert.isOfType(obj, Assert.NUMBER_TYPE);
    }

    /**
     * Checks if the given object is maybe a number
     *
     * @param obj
     * @returns {boolean}
     */
    public static isMaybeNumber(obj: any): boolean {
        return !isNaN(obj);
    }

    /**
     * Checks if the given object is a float
     *
     * @param obj
     * @returns {boolean}
     */
    public static isFloat(obj: any): boolean {
        if (Assert.isNull(obj)) {
            return false;
        }

        return obj % 1 > 0;
    }

    /**
     * Checks if the given object is symbol
     *
     * @param obj
     * @returns {boolean}
     */
    public static isSymbol(obj: any): boolean {
        return Assert.isOfType(obj, Assert.SYMBOL_TYPE);
    }
}