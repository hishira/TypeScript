import { Injectable, Type, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalProps } from '../models/modal-props.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _open: Subject<boolean> = new Subject<boolean>();
  private _bodyContent: Subject<{ component: Type<any>; props: any }> =
    new Subject();
  private _props: Subject<ModalProps> = new Subject();
  modalProps: ModalProps;
  constructor() {
    this._props.subscribe(next=>this.modalProps = next)
  }

  checkDialogOpen(): Subject<boolean> {
    return this._open;
  }

  get props(): ModalProps {
    return this.modalProps;
  }
  close() {
    this._open.next(false);
    this._bodyContent.next(undefined);
  }

  getContent(): Subject<{ component: Type<any>; props: any }> {
    return this._bodyContent;
  }

  getProps(): Subject<ModalProps> {
    return this._props;
  }

  setProps(props: ModalProps) {
    this._props.next(props);
  }
  open(contentComponent: Type<any>, props: ModalProps) {
    this._props.next(props);
    this._bodyContent.next({ component: contentComponent, props: props });
    this._open.next(true);
  }
}
