///<reference path='../typings/references.ts' />

class VAComponentElement extends HTMLElement {

    constructor() {
        super();
    }

    attachedCallback(): void {
        // ValiantTailor.getInstance().initElement(jQuery(this));
    }

    detachedCallback(): void {
        // ValiantTailor.getInstance().destroy(jQuery(this));
    }
}