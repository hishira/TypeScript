import { Component, Input } from "@angular/core";

@Component({
    selector: 'chip',
    templateUrl: './chip.component.html',
    styleUrls: ['./chip.component.css'],
})
export class ChipComponent {

    @Input() label: string;
    @Input() closable? : boolean = false
    @Input() closeHandle?: ()=>void = undefined;
    constructor(){
    }
}