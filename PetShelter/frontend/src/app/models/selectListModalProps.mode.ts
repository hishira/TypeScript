import { AbstractControl } from '@angular/forms';
export interface SelectListModalProps {
    selectList: Array<any>;
    placeholder: string;
    key: string;
    control: AbstractControl | null;
}