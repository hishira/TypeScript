import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PetFilterService } from '../../services/pet-filter.service';
import { forkJoin } from 'rxjs';
import { Gender } from 'src/app/models/gender.model';
import { PetSize } from 'src/app/models/petsize.model';
import { Breed } from 'src/app/models/breed.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PetType } from 'src/app/models/PetType.model';
import { Pet } from 'src/app/models/pet.model';
@Component({
    selector: 'pet-filter',
    templateUrl: './pet-filter.component.html',
    styleUrls: ['./pet-filter.component.scss'],
})
export class PetFilter implements OnInit {
    @Output() filterEvent: EventEmitter<Map<string, (pet: Pet) => boolean>> =
        new EventEmitter();
    @Input() pettype?: PetType;

    filterForm: FormGroup;
    filterMap: Map<string, (pet: Pet) => boolean> = new Map();
    genders: Array<Gender> = [];
    petBreeds: Array<Breed> = [];
    petsize: Array<PetSize> = [];
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
        private formBuilder: FormBuilder
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
        forkJoin([
            this.petFilterService.getGenderPet(),
            this.petFilterService.getPetSize(),
            this.petFilterService.getBreeds(
                this.pettype ? this.pettype : 'Dog'
            ),
        ]).subscribe((res) => {
            if (res.length === 3) {
                this.genders = res[0];
                this.petsize = res[1];
                this.petBreeds = res[2];
            }
        });
    }
    selectPetBreedHandle(breed: Breed) {
        !this.savedFilterValue.includes(breed.value) &&
            this.savedFilterValue.push(breed.value);
        this.filterForm.controls['breed_id'].setValue(breed.id);
    }
    selectPetGenderHandle(petgender: Gender) {
        !this.savedFilterValue.includes(petgender.value) &&
            this.savedFilterValue.push(petgender.value);
        this.filterForm.controls['gender_id'].setValue(petgender.id);
    }
    selectPetSizeHandle(petsize: PetSize) {
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
