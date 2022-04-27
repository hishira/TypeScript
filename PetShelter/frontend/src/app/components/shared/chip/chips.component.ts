import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'chip',
    templateUrl: './chip.component.html',
    styleUrls: ['./chip.component.css'],
})
export class ChipComponent {

    @Input() label: string;
    @Input() closable? : boolean = false
    @Output() closeHandle: EventEmitter<any> = new EventEmitter<any>();
    constructor(){
    }
    close(){
        this.closeHandle && this.closeHandle.emit();
    }
}