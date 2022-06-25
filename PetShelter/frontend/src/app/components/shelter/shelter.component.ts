import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {CenterService} from "../../services/center.service"
import {Center} from "../../models/center.model";
import { Icons } from 'src/app/models/icons.model';
@Component({
  selector: 'app-shelter',
  styleUrls: ['./shelter.component.scss'],
  templateUrl: './shelter.component.html',
})
export class ShelterComponent implements OnInit {
  center?: Center;
  emailPath: string = '';
  icons = Icons
  
  constructor(private route: ActivatedRoute,private centerservice: CenterService) { }

  ngOnInit(): void {
    this.getShelterinfo();
  }

  private getShelterinfo(): void{
    let shelterid:number = Number(this.route.snapshot.paramMap.get("id"));
    this.centerservice
        .getcenterbyid(shelterid)
        .subscribe(center=>{
          this.center=center
          this.emailPath=`mailto: ${center.email}`;
        })

  }
}
