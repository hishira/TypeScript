import { AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, forwardRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectItemDirective } from '../directives/select-item.directive';
const noneFunction = () => {};

@Component({
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>SelectListComponent)
    }
  ],
  selector: 'sh-select-list',
  styleUrls: ['./select-list.component.scss'],
  templateUrl: './select-list.component.html',
})
export class SelectListComponent implements ControlValueAccessor, OnInit {
  @Input() elements: Array<any> = [];
  @ViewChildren('select-item-directive') elementsRefs: ElementRef;
  //TODO check if we can make it better
  @Input() key: string = '';
  @ViewChildren(SelectItemDirective) myDirective!: QueryList<SelectItemDirective>;
  @Input() placeholder: string = '';
  @Input() select: string = ''; 
  down: boolean = false;
  placeholderSave: string = '';
  selfValue: any;
  spanColorChange: boolean = false;

  private onChangeCallback: (_: any) => void = noneFunction;
  private onTouchedCallback: () => void = noneFunction;

  constructor() {
  }
  
  get value() {
    return this.selfValue;
  }
  
  set value(newValue: any) {
    this.selfValue = newValue;
    console.log(newValue)
    this.onChangeCallback(newValue);
    this.onTouchedCallback();
  }

  elementClick(value: any): void {
    this.selfValue = value.select;
    this.value=value.select;
    this.spanColorChange = true;
    this.placeholder = value.placeholder;
    this.down = false;
    console.log(this.down)
  }
  
  ngOnInit(): void {
    this.down = false;
  }
  
  openList(event: any) {
    event.preventDefault();
    this.down = !this.down;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  
  writeValue(obj: any): void {
    this.selfValue = obj;
  }
}
