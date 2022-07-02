import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pet } from '../../../models/pet.model';
import { ActivatedRoute, Router } from '@angular/router'; 
import { PetService } from 'src/app/services/pet.service';
@Component({
  selector: 'app-pet',
  styleUrls: ['./pet.component.css'],
  templateUrl: './pet.component.html',
})
export class PetComponent implements OnInit {
  
  @Output() backEmit: EventEmitter<string> = new EventEmitter<string>();
  @Input() petId: number;
  
  pet: Pet;
  constructor( 
    private activateRoute: ActivatedRoute,
    private router: Router,
    private petService: PetService) {

  }

  backPage() {
    const pettype = this.activateRoute.snapshot.params['pettype'];
    console.log(pettype);
    this.backEmit.emit();
    this.router.navigate([`/pets/${pettype}`])
    
  }
  
  ngOnInit(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.petId = id;
    this.petService
    .getPetById(this.petId)
    .subscribe((pet:Pet)=>{
      this.pet = pet;
    })
  }

}
