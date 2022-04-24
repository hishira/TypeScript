import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { SelectListModalComponent } from './select-list-modal/select-list-modal.component';
@Component({
  selector: 'sh-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.css'],
})
export class SelectListComponent implements OnInit {
  @Input() control: AbstractControl | null = null;
  @Input() key: string = '';
  @Input() placeholder: string = '';
  @Input() selectList: Array<any> = [];
  
  @Output() selectEmit: EventEmitter<any> = new EventEmitter<any>();
  
  public down: boolean = true;
  public placeholderSave: string = '';
  public spanColorChange: boolean = false;

  constructor(private modalService: ModalService) {}
  
  elementClick(event: any, value: any): void {
    event.stopPropagation();
    this.spanColorChange = true;
    this.placeholder = value[this.key] as string;
    this.down = !this.down;
    this.selectEmit.emit(value);
  }

  ngOnInit() {
    this.placeholderSave = this.placeholder;
    this.control?.valueChanges.subscribe((value) => {
      if (!value) {
        this.placeholder = this.placeholderSave;
        this.spanColorChange = false;
      }
    });
  }

  openList() {
    if (this.selectList.length > 10) {
        this.modalService.open(
          SelectListModalComponent, 
          {
            selectList: this.selectList,
            placeholder: this.placeholder,
            key: this.key,
            control: this.control,
          });
    } else {
      this.down = !this.down;
    }
  }
}
