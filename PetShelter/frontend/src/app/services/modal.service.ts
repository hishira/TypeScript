import { Injectable, Type, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalProps } from '../models/modal-props.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalProps: ModalProps;
  private _bodyContent: Subject<{ component: Type<any>; props: any }> =
    new Subject();
  private _open: Subject<boolean> = new Subject<boolean>();
  private _props: Subject<ModalProps> = new Subject();
  constructor() {
    this._props.subscribe((next) => (this.modalProps = next));
  }

  get props(): ModalProps {
    return this.modalProps;
  }

  changeBodycontent(contentComponent: Type<any>, props: ModalProps) {
    this._props.next(props);
    this._bodyContent.next({ component: contentComponent, props: props });
  }

  checkDialogOpen(): Subject<boolean> {
    return this._open;
  }

  close() {
    this._open.next(false);
  }

  getContent(): Subject<{ component: Type<any>; props: any }> {
    return this._bodyContent;
  }

  getProps(): Subject<ModalProps> {
    return this._props;
  }

  open(contentComponent: Type<any>, props: ModalProps) {
    this._props.next(props);
    this._bodyContent.next({ component: contentComponent, props: props });
    this._open.next(true);
  }
  
  setProps(props: ModalProps) {
    this._props.next(props);
  }

}
