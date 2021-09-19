import { Component, OnInit, Input } from '@angular/core';
import { PetService } from '../pet.service';
import { Pet } from '../pet';
@Component({
  selector: 'app-shelterpets',
  templateUrl: './shelterpets.component.html',
  styleUrls: ['./shelterpets.component.css'],
})
export class ShelterpetsComponent implements OnInit {
  @Input() shelterid?: number;
  public pets?: Array<Pet>;
  public selectedPet: Pet | undefined;
  public petsShow: boolean = true;
  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.getPetbyCenter();
  }

  private getPetbyCenter(): void {
    if (this.shelterid)
      this.petService
        .getPetsByCenter(this.shelterid)
        .subscribe((pets) => (this.pets = pets));
  }

  choosePet(pet: Pet): void {
    this.selectedPet = pet;
    this.petsShow = false;
  }
  backPageHandle(): void {
    this.petsShow = true;
  }
}
