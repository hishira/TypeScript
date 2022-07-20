import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CenterService } from '../../services/center.service';
import { Center } from '../../models/center.model';
import { Icons } from 'src/app/models/icons.model';
import { getFullAddress } from 'src/app/models/address.models';
import { CentersGQL, CenterSchema } from 'src/app/types/types';
@Component({
  selector: 'app-shelter',
  styleUrls: ['./shelter.component.scss'],
  templateUrl: './shelter.component.html',
})
export class ShelterComponent implements OnInit {
  center?: CenterSchema;
  emailPath: string = '';
  fullAddress: string = '';
  icons = Icons;
  constructor(
    private route: ActivatedRoute,
    private centerservice: CenterService,
    private centers: CentersGQL
  ) {}

  ngOnInit(): void {
    this.getShelterinfo();
  }

  private getShelterinfo(): void {
    let shelterid: number = Number(this.route.snapshot.paramMap.get('id'));
    //this.centerservice
    //    .getcenterbyid(shelterid)
    //    .subscribe((center: Center)=>{
    //      this.center=center
    //      this.fullAddress = getFullAddress(center.address);
    //      this.emailPath=`mailto: ${center.email}`;
    //    })
    this.centers
      .watch({
        centerId: shelterid,
      })
      .valueChanges.subscribe((center) => {
        this.center = center.data.centers[0];
      });
  }
}
