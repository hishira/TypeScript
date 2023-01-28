import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { PetType } from 'src/app/models/PetType.model';
import { Pet } from 'src/app/models/pet.model';
import { BreedSchema, GenderSchema, PetFiltersGQL, PetSchema, SizeSchema } from 'src/app/types/types';
type FilterFormGroup = {
    breedId: FormControl<number | null>,
    el: FormControl<number[] | null>,
    genderId: FormControl<number | null>,
    sizeId: FormControl<number | null>,
}
@Component({
    selector: 'pet-filter',
    styleUrls: ['./pet-filter.component.scss'],
    templateUrl: './pet-filter.component.html',
})
export class PetFilter implements OnInit {
    @Output() filterEvent: EventEmitter<Map<string, (pet: Partial<PetSchema>) => boolean>> =
        new EventEmitter();
    @Input() pettype?: PetType;

    filterForm: FormGroup<FilterFormGroup>;
    filterMap: Map<string, (pet: Partial<PetSchema>) => boolean> = new Map();
    genders: GenderSchema[] = [];
    petBreeds: Partial<BreedSchema>[] = [];
    petsize: SizeSchema[] = [];
    savedFilterValue: string[] = [];
    value: any[] = [];

    get petSizeOnlyvalue() {
        return this.petsize.map((size) => size.value);
    }

    get petBreedOnlyValue() {
        return this.petBreeds.map((breed)=>breed.value);
    }

    get petGenderOnlyValue() {
        return this.genders.map((gender)=>gender.value);
    }
    
    constructor(
        private formBuilder: FormBuilder,
        private petFilters: PetFiltersGQL,
    ) {
        this.filterForm = this.formBuilder.group<FilterFormGroup>({
            breedId: new FormControl(1),
            el: new FormControl([]),
            genderId: new FormControl(1),
            sizeId: new FormControl(1),
        });
        this.filterForm
            .get('el')
            ?.valueChanges.subscribe((value) => console.log(value));
        this.onChanges();
    }
    
    buttonClearEvent(): void {
        this.clearFilterForm();
        this.filterMap.clear();
        this.savedFilterValue = [];
        this.filterEvent.emit(this.filterMap);
    }
    
    chipCloseHandle(label: string): void {
        this.savedFilterValue = this.savedFilterValue.filter(
            (filterName) => filterName !== label
        );
        this.filterEvent.emit(this.filterMap);
    }

    clearButtonVisible(): boolean {
        return this.filterMap.size > 0;
    }

    ngOnInit(): void {
        this.petFilters.watch({
            petTypeId: this.pettype === 'Dog'? 1:2
        }).valueChanges.subscribe((result)=>{
            this.genders = result.data.genders;
            this.petsize = result.data.petsizes;
            this.petBreeds = result.data.breeds;
        })
    }
    selectPetBreedHandle(breed: BreedSchema) {
        !this.savedFilterValue.includes(breed.value) &&
            this.savedFilterValue.push(breed.value);
        this.filterForm.controls['breedId'].setValue(breed.id);
    }
    selectPetGenderHandle(petgender: GenderSchema) {
        !this.savedFilterValue.includes(petgender.value) &&
            this.savedFilterValue.push(petgender.value);
        this.filterForm.controls['genderId'].setValue(petgender.id);
    }
    selectPetSizeHandle(petsize: SizeSchema) {
        !this.savedFilterValue.includes(petsize.value) &&
            this.savedFilterValue.push(petsize.value);
        this.filterForm.controls['sizeId'].setValue(petsize.id);
    }

    private clearFilterForm(): void {
        this.filterForm.setValue({
            breedId: 0,
            el: [],
            genderId: 0,
            sizeId: 0,
        });
    }
    private filterFormChanges() {
        for (let control of Object.keys(this.filterForm.controls)) {
            this.filterForm
                .get(control)
                ?.valueChanges.subscribe((id: string) => {
                    this.filterMap.set(
                        control,
                        (pet: Partial<PetSchema>) => ({ ...pet }[control] === parseInt(id))
                    );
                    this.filterEvent.emit(this.filterMap);
                });
        }
    }
    private onChanges() {
        this.filterFormChanges();
    }
}
