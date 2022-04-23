import { Component, OnInit, Type } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  modalContent: Type<Component>;
  props: any;
  open: boolean = false;
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.getContent().subscribe((value: {component: Type<Component>, props: any}) => {
      this.modalContent = value.component;
      this.props = value.props;
    })
    this.modalService.checkDialogOpen().subscribe((value: boolean)=>{
      this.open = value;
    })
  }

}
