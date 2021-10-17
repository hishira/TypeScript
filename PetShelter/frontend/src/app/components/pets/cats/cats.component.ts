import { Component, OnInit } from '@angular/core';
import { PetService } from '../../../services/pet.service';
import { Pet } from '../../../pet';
@Component({
  selector: 'pet-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css'],
})
export class CatsComponent implements OnInit {
  cats?: Pet[];
  constructor(private petsservice: PetService) {}

  ngOnInit(): void {
      this.getCats();
  }

  private getCats(): void {
    this.petsservice
        .getOnlyCats()
        .subscribe((cats: Pet[]) => {
            this.cats = cats;
        });
  }
}
