import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-select-item',
    templateUrl: './select-item.component.html'
})
export class SelectItemComponent {
    @Output() addItem: EventEmitter<any> = new EventEmitter<any>();   
    @Input() label: string | undefined = undefined;
    @Output() removeItem: EventEmitter<any> = new EventEmitter<any>()
    @Input() selectItem: any = undefined;
    
    constructor(){}

    detectCheckboxChence(event: any){
        if(event.currentTarget.checked) {
            this.addItem.emit(this.selectItem)
        } else {
            this.removeItem.emit(this.selectItem);
        }
    }
}