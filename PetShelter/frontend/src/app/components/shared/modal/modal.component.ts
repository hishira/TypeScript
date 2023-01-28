import { Component, Injector, OnInit, Type } from '@angular/core';
import { ModalProps } from 'src/app/models/modal-props.model';
import { ModalService } from 'src/app/services/modal.service';
import { DocumentService } from 'src/app/services/document.service';
@Component({
  selector: 'app-modal',
  styleUrls: ['./modal.component.scss'],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  componentInjector: Injector;
  modalContent: Type<Component>;
  open: boolean = false;

  constructor(
    private modalService: ModalService,
    private documentService: DocumentService
  ) {}
  close() {
    this.modalService.close();
  }
  ngOnInit(): void {
    this.modalService
      .getContent()
      .subscribe((value: { component: Type<Component>; props: ModalProps }) => {
        console.log(value);
        this.modalContent = value.component;
      });
    this.modalService.checkDialogOpen().subscribe((value: boolean) => {
      this.open = value;
      if (this.open) {
        this.documentService.changeTagCssProperty(
          'body',
          'overflow-y',
          'scroll'
        );
      } else {
        this.documentService.changeTagCssProperty('body', 'overflow-y', 'auto');
      }
    });
  }

  get propsValue() {
    return this.modalService.getProps();
  }
}
