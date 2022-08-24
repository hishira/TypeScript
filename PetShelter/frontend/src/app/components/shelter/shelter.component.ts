import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getFullAddress } from 'src/app/models/address.models';
import { Icons } from 'src/app/models/icons.model';
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
    private centers: CentersGQL
  ) {}

  ngOnInit(): void {
    this.getShelterinfo();
  }

  private getShelterinfo(): void {
    let shelterid: number = Number(this.route.snapshot.paramMap.get('id'));
  
    this.centers
      .watch({
        centerId: shelterid,
      })
      .valueChanges.subscribe((center) => {
        this.center = center.data.centers[0];
        this.fullAddress = getFullAddress(center.data.centers[0].address)
      });
  }
}
