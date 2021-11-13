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
@Component({
  selector: 'pet-filter',
  templateUrl: './pet-filter.component.html',
  styleUrls: ['./pet-filter.component.css'],
})
export class PetFilter implements OnInit {
  
  @Output() filterEvent: EventEmitter<PetFilterEvent> = new EventEmitter()
  @Input() pettype?: PetType;
  genders: Array<Gender> = [];
  petsize: Array<PetSize> = [];
  petBreeds: Array<Breed> = [];
  filterForm: FormGroup;
  constructor(
    private petFilterService: PetFilterService,
    private formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      breed: [0],
      gender: [0],
      size: [0],
    });
    this.OnChanges();
  }

  ngOnInit(): void {
    forkJoin([
      this.petFilterService.getGenderPet(),
      this.petFilterService.getPetSize(),
      this.petFilterService.getBreeds(this.pettype? this.pettype : 'Dog'),
    ]).subscribe((res) => {
      if (res.length === 3) {
        this.genders = res[0];
        this.petsize = res[1];
        this.petBreeds = res[2];
      }
    });
  }

  private preparePetEvent(filterType: PetFilterType, id: number): PetFilterEvent {
    return {filterType, id};
  }

  private OnChanges() {
    for(let control of Object.keys(this.filterForm.controls)){
      this.filterForm.get(control)
         ?.valueChanges.subscribe( (id: string) => {
        this.filterEvent.emit(this.preparePetEvent(control as PetFilterType, parseInt(id)))
      })
    }
  }
}
