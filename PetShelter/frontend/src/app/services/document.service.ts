import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class DocumentService {

    constructor(){}

    changeTagCssProperty(tagName: string, cssProperty: string, cssValue: string): void {
        const documenttag = document.getElementsByTagName(tagName)[0] as HTMLElement;
        documenttag.setAttribute('style', `${cssProperty}:${cssValue}`);
    }

    togglElementClasses<T extends HTMLElement>(htmlElement: T, ...cssClassses: string[]): void{
        for(let cssClass of cssClassses){
            htmlElement.classList.toggle(cssClass)
        }
    }
}