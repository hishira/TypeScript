import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "sh-select-list",
    templateUrl: './select-list.component.html',
    styleUrls: ['./select-list.component.css']
})
export class SelectListComponent implements OnInit {

    @Input() selectList: Array<any> = []
    @Input() placeholder: string = ''
    @Output() selectEmit: EventEmitter<any> = new EventEmitter<any>();
    public down: boolean = true;
    ngOnInit() {
        

    }
}