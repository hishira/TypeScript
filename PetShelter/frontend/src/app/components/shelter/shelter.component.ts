import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {CenterService} from "../../services/center.service"
import {Center} from "../../models/center.model";
import {Pet} from "../../models/pet.model";
@Component({
  selector: 'app-shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.css']
})
export class ShelterComponent implements OnInit {
  center?: Center;
  pets?: Array<Pet>
  constructor(private route: ActivatedRoute,
    private location: Location,
    private centerservice: CenterService) { }

  ngOnInit(): void {
    this.getShelterinfo();
  }

  private getShelterinfo(): void{
    let shelterid:number = Number(this.route.snapshot.paramMap.get("id"));
    this.centerservice
        .getcenterbyid(shelterid)
        .subscribe(center=>{
          this.center=center
          this.pets = center.pets;
        })

  }
}
