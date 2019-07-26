///<reference path='../typings/references.ts' />

class VAWidgetElement extends HTMLElement {
    constructor() {
        super();
    }

    detachedCallback(): void {
        console.log("detached");
    }

    attachedCallback(): void {
        VT3000.getInstance().fetchElementsFromDom();
    }
}