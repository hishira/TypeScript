import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pet } from '../../../models/pet.model';
import { ActivatedRoute, Router } from '@angular/router'; 
@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css'],
})
export class PetComponent implements OnInit {
  @Input() pet?: number | undefined;
  @Output() backEmit: EventEmitter<string> = new EventEmitter<string>();
  
  constructor( private activateRoute: ActivatedRoute,
        private router: Router) {

  }

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.pet = id;
  }

  backPage() {
    const pettype = this.activateRoute.snapshot.params['pettype'];
    console.log(pettype);
    this.backEmit.emit();
    this.router.navigate([`/pets/${pettype}`])
    
  }
}
