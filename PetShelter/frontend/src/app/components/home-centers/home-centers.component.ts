import { Component, OnInit } from '@angular/core';
import { CenterSchema, CentersGQL } from 'src/app/types/types';
@Component({
  selector: 'app-home-centers',
  styleUrls: ['./home-centers.component.scss'],
  templateUrl: './home-centers.component.html'
})
export class HomeCentersComponent implements OnInit {
  
  centers?: CenterSchema[];
  fullAddress: string;
  constructor(
    private centersQuery: CentersGQL
    ) { }

  getFullAddress(center: CenterSchema): string{
    return `${center.address.address}, ${center.address.city} ${center.address.country}`
  }
  
  ngOnInit(){
    this.getCenters();
  }
  
  private getCenters(): void {
    this.centersQuery.watch({}).valueChanges.subscribe((centers)=>{
      this.centers = centers.data.centers;
    })
  }
}
