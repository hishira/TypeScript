import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pet } from '../../../pet';
@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css'],
})
export class PetComponent implements OnInit {
  @Input() pet?: Pet;
  @Output() backEmit: EventEmitter<string> = new EventEmitter<string>();
  constructor() {
  }

  ngOnInit(): void {
    if(this.pet)
    console.log(this.pet)

  }

  backPage() {
    this.backEmit.emit('');
  }
}
