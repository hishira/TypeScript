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
  private intervalCheck: NodeJS.Timer | null = null;
  private petAppearInterval: number = 0;
  constructor(private petService: PetService) {}

  private intervalStart():void{
    this.intervalCheck = setInterval(() => {
      const elements: HTMLCollectionOf<Element> =
        document.getElementsByClassName('pet');
      if (this.conditionCheck(elements)) {
        this.checkEvrything(elements);
      }
    }, 50);
  }
  ngOnInit(): void {
    this.getPetbyCenter();
    this.intervalStart();
  }

  private conditionCheck(elements: HTMLCollectionOf<Element>): boolean {
    return (
      this.pets !== undefined &&
      this.pets.length > 0 &&
      elements.length === this.pets.length
    );
  }

  private setPetOpacity(pet: HTMLElement) {
    pet.style.opacity = '1';
  }

  private appearPetElement(petelement: HTMLCollectionOf<HTMLElement>) {
    Array.from(petelement).forEach((pet) => {
      setTimeout(() => {this.setPetOpacity(pet)}, this.petAppearInterval);
      this.petAppearInterval += 200;
      console.log(this.petAppearInterval)
    });
  }

  private checkEvrything(petelement: HTMLCollectionOf<Element>) {
    if (this.intervalCheck) {
      this.appearPetElement(petelement as HTMLCollectionOf<HTMLElement>);
      clearInterval(this.intervalCheck);
    }
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
    this.petAppearInterval = 0;
    this.intervalStart();
  }
}
