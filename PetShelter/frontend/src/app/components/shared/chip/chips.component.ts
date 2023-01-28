import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'chip',
    templateUrl: './chip.component.html',
    styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {

    @Input() closable? : boolean = false
    @Input() label: string;
    
    @Output() closeHandle: EventEmitter<any> = new EventEmitter<any>();
    constructor(){
    }
    close(){
        this.closeHandle && this.closeHandle.emit();
    }
}