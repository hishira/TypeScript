import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'select-list-item',
    styleUrls: ['./select-list-item.component.css'],
    templateUrl: './select-list-item.component.html',
})
export class SelectListItemComponent {
    @Input() key: string = '';
    @Input() select: string = '';
    @Input() selectItem: any = undefined
    @Output() valueChangeHandle: EventEmitter<any> = new EventEmitter();
    constructor(){}

    detectSelectItem(){
        this.valueChangeHandle.emit({placeholder: this.selectItem[this.key], select: this.selectItem[this.select]});
    }

}