import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet.model';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-shelterpets',
  styleUrls: ['./shelterpets.component.css'],
  templateUrl: './shelterpets.component.html',
})
export class ShelterpetsComponent implements OnInit, OnChanges {
  
  @Input() pets?: Array<Pet>;
  public selectedPet: Pet | undefined;
  public petsShow: boolean = true;
  private intervalCheck: NodeJS.Timer | null = null;
  private afterFilterInterval: NodeJS.Timer | null = null;
  private petAppearInterval: number = 0;
  constructor(private petService: PetService,
      private router: Router) {}

 
  // TODO Fix problem with filter pet array
  ngOnInit(): void {
    this.pets = this.pets;
    this.petAppearInterval = 0;
    this.petsShow = true;
    this.intervalStart();
    console.log(this.pets)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.pets.firstChange && changes.pets.currentValue !== []) {
        this.pets = changes.pets.currentValue;
        this.petAppearInterval = 0;
        this.intervalCheck = null
        this.brokenIntervalAfterFilter();
    }

  }
  choosePet(pet: Pet): string {
    //this.selectedPet = pet;
    //this.petsShow = false;
    return `${pet.id}`;
  }

  backPageHandle(): void {
    this.petsShow = true;
    this.petAppearInterval = 0;
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
    pet.classList.add('appear')
  }

  // TODO Check if we can fix it, after filter from empty to something get
  // into loop
  private brokenIntervalAfterFilter(): void {
    this.afterFilterInterval = setInterval( ()=>{
      const elements: HTMLCollectionOf<Element> =
      document.getElementsByClassName('pet');
      console.log("Searching")
      if(elements && this.afterFilterInterval){
        this.appearPetElement(elements as HTMLCollectionOf<HTMLElement>);
        clearInterval(this.afterFilterInterval)
      }
    },50)
  }
  private appearPetElement(petelement: HTMLCollectionOf<HTMLElement>) {
    Array.from(petelement).forEach((pet) => {
      setTimeout(() => {this.setPetOpacity(pet)}, this.petAppearInterval);
      this.petAppearInterval += 200;
      console.log(this.petAppearInterval);
    });
  }

  private checkEvrything(petelement: HTMLCollectionOf<Element>) {
    this.appearPetElement(petelement as HTMLCollectionOf<HTMLElement>);
    if (this.intervalCheck) {
      clearInterval(this.intervalCheck);
    }
  }
  private intervalStart():void{
    this.intervalCheck = setInterval(() => {
      const elements: HTMLCollectionOf<Element> =
        document.getElementsByClassName('pet');
      if (this.conditionCheck(elements)) {
        this.checkEvrything(elements);
      }
    }, 50);
  }
  
}
