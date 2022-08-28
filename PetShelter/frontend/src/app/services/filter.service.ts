import { Injectable } from "@angular/core";
import { ModalProps } from "../models/modal-props.model";
import { SelectListModalProps } from './../models/selectListModalProps.mode';
import {has, get} from 'lodash'
import {  UntypedFormControl } from "@angular/forms";
@Injectable({
    providedIn: 'root'
})
export class FilterService {
  selectFilterModalMapper(props: ModalProps): SelectListModalProps{
    const mappedValue: SelectListModalProps = this.getEmptySelectListModalProps();
    if(has(props, 'selectList')) {
        mappedValue.selectList = get(props, 'selectList', []); 
    }
    if(has(props, 'placeholder')) {
        mappedValue.placeholder = get(props, 'placeholder', '');
    }
    if(has(props, 'key')) {
        mappedValue.key = get(props, 'key', '');
    }
    if(has(props, 'control')) {
        mappedValue.control = get(props, 'control', new UntypedFormControl('',[]));
    }
    return mappedValue;
  }  

  private getEmptySelectListModalProps(): SelectListModalProps {
      return {
          selectList: [],
          placeholder: '',
          key: '',
          control: null,
      }
  }
}