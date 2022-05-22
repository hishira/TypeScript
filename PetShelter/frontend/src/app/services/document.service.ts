import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class DocumentService {

    constructor(){}

    changeTagCssProperty(tagName: string, cssProperty: string, cssValue: string) {
        const documenttag = document.getElementsByTagName(tagName)[0] as HTMLElement;
        documenttag.setAttribute('style', `${cssProperty}:${cssValue}`);
    }
}