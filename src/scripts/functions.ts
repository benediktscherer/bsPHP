///<reference path='VT3000/typings/references.ts' />

jQuery(document).ready(function () {
    console.log('DOM Ready');

    let vt3000 = new VT3000();
    vt3000.init();

    jQuery('body').addClass(Browser.getBrowser()).addClass(Browser.getType());
});