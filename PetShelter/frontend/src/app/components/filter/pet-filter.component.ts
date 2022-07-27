import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PetFilterService } from '../../services/pet-filter.service';
import { forkJoin } from 'rxjs';
import { Gender } from 'src/app/models/gender.model';
import { PetSize } from 'src/app/models/petsize.model';
import { Breed } from 'src/app/models/breed.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PetType } from 'src/app/models/PetType.model';
import { Pet } from 'src/app/models/pet.model';
import { BreedSchema, GenderSchema, PetFiltersGQL, SizeSchema } from 'src/app/types/types';
@Component({
    selector: 'pet-filter',
    styleUrls: ['./pet-filter.component.scss'],
    templateUrl: './pet-filter.component.html',
})
export class PetFilter implements OnInit {
    @Output() filterEvent: EventEmitter<Map<string, (pet: Pet) => boolean>> =
        new EventEmitter();
    @Input() pettype?: PetType;

    filterForm: FormGroup;
    filterMap: Map<string, (pet: Pet) => boolean> = new Map();
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
        private petFilterService: PetFilterService,
        private formBuilder: FormBuilder,
        private petFilters: PetFiltersGQL,
    ) {
        this.filterForm = this.formBuilder.group({
            breed_id: [0],
            el: [[]],
            gender_id: [0],
            size_id: [0],
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
        this.filterForm.controls['breed_id'].setValue(breed.id);
    }
    selectPetGenderHandle(petgender: GenderSchema) {
        !this.savedFilterValue.includes(petgender.value) &&
            this.savedFilterValue.push(petgender.value);
        this.filterForm.controls['gender_id'].setValue(petgender.id);
    }
    selectPetSizeHandle(petsize: SizeSchema) {
        !this.savedFilterValue.includes(petsize.value) &&
            this.savedFilterValue.push(petsize.value);
        this.filterForm.controls['size_id'].setValue(petsize.id);
    }

    private clearFilterForm(): void {
        this.filterForm.setValue({
            breed_id: 0,
            gender_id: 0,
            size_id: 0,
        });
    }
    private filterFormChanges() {
        for (let control of Object.keys(this.filterForm.controls)) {
            this.filterForm
                .get(control)
                ?.valueChanges.subscribe((id: string) => {
                    this.filterMap.set(
                        control,
                        (pet: Pet) => ({ ...pet }[control] === parseInt(id))
                    );
                    this.filterEvent.emit(this.filterMap);
                });
        }
    }
    private onChanges() {
        this.filterFormChanges();
    }
}
