import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ModalService{
    nextStepChange: Subject<void> = new Subject();
}