import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Component({
    selector: "sh-select-list",
    templateUrl: './select-list.component.html',
    styleUrls: ['./select-list.component.css']
})
export class SelectListComponent implements OnInit {

    @Input() selectList: Array<any> = []
    @Input() placeholder: string = ''
    @Output() selectEmit: EventEmitter<any> = new EventEmitter<any>();
    @Input() key: string = '';
    @Input() control: AbstractControl | null = null;
    
    public down: boolean = true;
    public spanColorChange: boolean = false;
    public placeholderSave: string = ''
    ngOnInit() {
        this.placeholderSave = this.placeholder;
        this.control?.valueChanges.subscribe(value=>{
            if(!value) {
                this.placeholder = this.placeholderSave
                this.spanColorChange = false;
            }
        })
    }
    
    elementClick(event: any, value: any): void {
        event.stopPropagation()
        this.spanColorChange = true;
        this.placeholder = value[this.key] as string;
        this.down = !this.down
        this.selectEmit.emit(value);

    }
}