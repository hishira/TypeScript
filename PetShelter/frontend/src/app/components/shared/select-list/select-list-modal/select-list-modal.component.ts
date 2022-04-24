import { Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from './../../modal/modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { AbstractControl } from '@angular/forms';
import { FilterService } from './../../../../services/filter.service';
@Component({
  selector: 'sh-select-list-modal',
  templateUrl: './select-list-modal.component.html',
})
export class SelectListModalComponent extends ModalComponent implements OnInit {
  selectList: Array<any> = [];
  placeholder: string = '';
  key: string = '';
  control: AbstractControl | null = null;

  constructor(
    modalService: ModalService,
    private filterService: FilterService
  ) {
    super(modalService);
    if(modalService.props){
      const mappedProps = this.filterService.selectFilterModalMapper(modalService.props);
      this.selectList = mappedProps.selectList;
      this.placeholder = mappedProps.placeholder;
      this.key = mappedProps.key;
      this.control = mappedProps.control;
    }
  }

  ngOnInit(): void {
    console.log("Hi");
  }
}
