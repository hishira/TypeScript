import { Component, OnInit } from "@angular/core";
import { has } from "lodash";
import { ModalService } from "src/app/services/modal.service";
import { PetsponsorValue } from "../sponsor-form/sponsor-form.component";

@Component({
    selector: 'app-sponsor-modal',
    templateUrl: './sponsor-modal.component.html'
})
export class SponsorModalComponent implements OnInit{

    title?: string;

    constructor(private modalService: ModalService){}
    
    getEmitedValue(formValue?: PetsponsorValue): void {
        console.log(formValue)
    }
    
    ngOnInit(): void {
        if(has(this.modalService.props, 'modalTitle')){
            console.log(this.modalService.props)
         this.title = this.modalService.props.modalTitle;
        }
    }

}