import { AbstractControl } from '@angular/forms';
export interface SelectListModalProps {
    control: AbstractControl | null;
    key: string;
    placeholder: string;
    selectList: Array<any>;
}