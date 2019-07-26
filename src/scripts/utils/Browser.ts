///<reference path='../VT3000/typings/references.ts' />

class Browser {

    /**
     * https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
     */
    public static getType() {
        let deviceType: string = 'desktop';

        switch (true) {
            case !!navigator.userAgent.match(/Android/i):
                deviceType = 'android';
                break;

            case !!navigator.userAgent.match(/webOS/i):
                deviceType = 'web-os';
                break;

            case !!navigator.userAgent.match(/iPhone/i):
                deviceType = 'iphone';
                break;

            case !!navigator.userAgent.match(/iPad/i):
                deviceType = 'ipad';
                break;

            case !!navigator.userAgent.match(/BlackBerry/i):
                deviceType = 'blackberry';
                break;

            case !!navigator.userAgent.match(/Windows Phone/i):
                deviceType = 'windows-phone';
                break;
        }

        return deviceType;
    }


    /**
     * https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser/9851769
     */
    public static getBrowser() {
        let browserType: string = '';

        // Opera 8.0+
        // @ts-ignore
        const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

        // Firefox 1.0+
        // @ts-ignore
        const isFirefox = typeof InstallTrigger !== 'undefined';

        // Safari 3.0+ "[object HTMLElementConstructor]"
        let isSafari: boolean = false;

        function safariTest(obj) {
            return obj.toString() === "[object SafariRemoteNotification]";
        }

        if (window["safari"] && typeof window["safari"] !== 'undefined') {
            isSafari = safariTest(window["safari"].pushNotification);
        }

        // mobile safari
        // funktioniert aber auch für alle anderen safari (desktop) versionen.
        const isMobileSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);


        // Internet Explorer 6-11
        // @ts-ignore
        const isIE = /*@cc_on!@*/ !!document.documentMode;

        // Edge 20+
        // @ts-ignore
        const isEdge = !isIE && !!window.StyleMedia;

        // Chrome 1+
        // @ts-ignore
        const isChrome = !!window.chrome;

        // Blink engine detection
        // @ts-ignore
        const isBlink = (isChrome || isOpera) && !!window.CSS;


        switch (true) {
            case isOpera:
                browserType = 'opera';
                break;

            case isFirefox:
                browserType = 'firefox';
                break;

            case isIE:
                browserType = 'ie';
                break;

            case isEdge:
                browserType = 'ie -edge';
                break;

            case isChrome:
                browserType = 'chrome';
                break;

            case isBlink:
                browserType = 'blink';
                break;

            case isSafari:
                browserType = 'safari';
                break;

            case isMobileSafari:
                browserType = 'safari';
                break;

            default:
                browserType = 'unknown-browser';
        }

        return browserType;
    }
}
