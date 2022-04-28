import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PetFilterService } from '../../services/pet-filter.service';
import { forkJoin } from 'rxjs';
import { Gender } from 'src/app/models/gender.model';
import { PetSize } from 'src/app/models/petsize.model';
import { Breed } from 'src/app/models/breed.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PetFilterEvent } from 'src/app/models/pet-filter-event.model';
import { PetFilterType } from 'src/app/models/FilterType.model';
import { PetType } from 'src/app/models/PetType.model';
import { Pet } from 'src/app/models/pet.model';
@Component({
  selector: 'pet-filter',
  templateUrl: './pet-filter.component.html',
  styleUrls: ['./pet-filter.component.css'],
})
export class PetFilter implements OnInit {
  @Input() pettype?: PetType;

  @Output() filterEvent: EventEmitter<Map<string, (pet: Pet) => boolean>> =
    new EventEmitter();

  filterForm: FormGroup;
  filterMap: Map<string, (pet: Pet) => boolean> = new Map();
  genders: Array<Gender> = [];
  petBreeds: Array<Breed> = [];
  petsize: Array<PetSize> = [];
  savedFilterValue: string[] = [];
  constructor(
    private petFilterService: PetFilterService,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      breed_id: [0],
      gender_id: [0],
      size_id: [0],
    });
    this.OnChanges();
  }

  ngOnInit(): void {
    forkJoin([
      this.petFilterService.getGenderPet(),
      this.petFilterService.getPetSize(),
      this.petFilterService.getBreeds(this.pettype ? this.pettype : 'Dog'),
    ]).subscribe((res) => {
      if (res.length === 3) {
        this.genders = res[0];
        this.petsize = res[1];
        this.petBreeds = res[2];
      }
    });
  }

  // TODO when evrything goes ok, delete this
  private preparePetEvent(
    filterType: PetFilterType,
    id: number
  ): PetFilterEvent {
    return { filterType, id };
  }

  private OnChanges() {
    for (let control of Object.keys(this.filterForm.controls)) {
      this.filterForm.get(control)?.valueChanges.subscribe((id: string) => {
        this.filterMap.set(
          control,
          (pet: Pet) => ({ ...pet }[control] === parseInt(id))
        );
        this.filterEvent.emit(this.filterMap);
      });
    }
  }

  public clearButtonVisible(): boolean {
    return this.filterMap.size > 0;
  }

  private clearFilterForm(): void {
    this.filterForm.setValue({
      breed_id: 0,
      gender_id: 0,
      size_id: 0,
    });
  }

  chipCloseHandle(label: string): void {
    this.savedFilterValue = this.savedFilterValue.filter(filterName=>filterName !== label);
  }
  buttonClearEvent(): void {
    this.clearFilterForm();
    this.filterMap.clear();
    this.filterEvent.emit(this.filterMap);
  }

  selectPetSizeHandle(petsize: PetSize) {
    !this.savedFilterValue.includes(petsize.value) && this.savedFilterValue.push(petsize.value);
    this.filterForm.controls['size_id'].setValue(petsize.id);
  }

  selectPetGenderHandle(petgender: Gender) {
    !this.savedFilterValue.includes(petgender.value) && this.savedFilterValue.push(petgender.value);
    this.filterForm.controls['gender_id'].setValue(petgender.id);
  }

  selectPetBreedHandle(breed: Breed) {
    !this.savedFilterValue.includes(breed.value) && this.savedFilterValue.push(breed.value);
    this.filterForm.controls['breed_id'].setValue(breed.id);
  }
}
