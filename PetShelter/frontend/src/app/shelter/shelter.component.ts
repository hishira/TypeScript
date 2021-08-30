import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {CenterService} from "../center.service"
import {Center} from "../center";
@Component({
  selector: 'app-shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.css']
})
export class ShelterComponent implements OnInit {
  center?: Center;
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
        .subscribe(center=>this.center=center)

  }
}
