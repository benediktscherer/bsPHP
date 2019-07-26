///<reference path='../typings/references.ts' />

class VAModuleElement extends HTMLElement {

    constructor() {
        super();
    }

    attachedCallback(): void {
        // ValiantTailor.getInstance().initModule(jQuery(this));
    }

    detachedCallback(): void {
        // ValiantTailor.getInstance().destroyModule(jQuery(this));
    }
}