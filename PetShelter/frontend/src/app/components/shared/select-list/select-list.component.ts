import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { SelectListModalComponent } from './select-list-modal/select-list-modal.component';
@Component({
  selector: 'sh-select-list',
  styleUrls: ['./select-list.component.css'],
  templateUrl: './select-list.component.html',
})
export class SelectListComponent implements OnInit {
  @Input() control: AbstractControl | null = null;
  @Input() key: string = '';
  @Input() placeholder: string = '';
  @Output() selectEmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectList: Array<any> = [];
  
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
      this.down = !this.down;
  }
}
