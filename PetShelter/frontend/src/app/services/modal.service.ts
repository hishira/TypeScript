import { Injectable, Type, Component } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _open: Subject<boolean> = new Subject<boolean>();
  private _bodyContent: Subject<{component: Type<any>, props: any}> = new Subject();
  constructor() {}

  
  checkDialogOpen(): Subject<boolean>{
    return this._open;
  }
  
  close() {
    this._open.next(false);
    this._bodyContent.next(undefined);
  }
  
  getContent(): Subject<{ component: Type<any>, props: any}> {
    return this._bodyContent;
  }


  open(contentComponent: Type<any>, props: any) {
    this._bodyContent.next({component: contentComponent, props});
    this._open.next(true);
  }
}
