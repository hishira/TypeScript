import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isEqual } from 'lodash';
const noneFunction = () => {};
@Component({
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectMultipleListComponent),
    },
  ],
  selector: 'app-select-multiple-list',
  styleUrls: ['./select-multiple-list.component.scss'],
  templateUrl: './select-multiple-list.component.html',
})
export class SelectMultipleListComponent implements ControlValueAccessor {
  /*
    Component for choose multiple value from list,for best elements must be
    values which user want to choose, not object
  */
  
  @Input() elements: any[];
  
  selfValue: any[] = [];
  
  private onChangeCallback: (_: any) => void = noneFunction;
  private onTouuchedCallback: () => void = noneFunction;
  
  constructor() {}
  
  get value(){
    return this.selfValue;
  }
  set value(newValue: any[]) {
    this.selfValue = newValue;
    this.onChangeCallback(newValue);
    this.onTouuchedCallback();
  }
  
  append(itemToAppend: any) {
    this.selfValue.push(itemToAppend);
    this.value = this.selfValue;
  }
  
  deleteItem(itemtoDelete: any){
    this.selfValue = this.selfValue.filter(item=>!isEqual(item,itemtoDelete));
    this.value = this.selfValue;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouuchedCallback = fn;
  }

  writeValue(obj: any[]): void {
   this.selfValue = obj
  }

  

}
