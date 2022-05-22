import { Component, Injector, OnInit, Type } from '@angular/core';
import { ModalProps } from 'src/app/models/modal-props.model';
import { ModalService } from 'src/app/services/modal.service';
import { DocumentService } from 'src/app/services/document.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  modalContent: Type<Component>;
  componentInjector: Injector;
  open: boolean = false;

  constructor(
    private modalService: ModalService,
    private documentService: DocumentService) {}

  ngOnInit(): void {
    this.modalService
      .getContent()
      .subscribe((value: { component: Type<Component>; props: ModalProps }) => {
        this.modalContent = value.component;

      });
    this.modalService.checkDialogOpen().subscribe((value: boolean) => {
      this.open = value;
      if(this.open === true) {
        this.documentService.changeTagCssProperty('body', 'overflow-y', 'scroll');
      } else {
        this.documentService.changeTagCssProperty('body', 'overflow-y', 'auto');
      }
    });
   
  }

  get propsValue() {
    return this.modalService.getProps();
  }

  close(){
    this.modalService.close()
  }
}
