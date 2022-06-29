import { Component, OnInit } from '@angular/core';
import { Center } from "../../models/center.model";
import { CenterService } from "../../services/center.service";

@Component({
  selector: 'app-home-centers',
  styleUrls: ['./home-centers.component.scss'],
  templateUrl: './home-centers.component.html'
})
export class HomeCentersComponent implements OnInit {
  
  centers?: Center[];
  fullAddress: string;
  constructor(private centerService: CenterService) { }

  getFullAddress(center: Center): string{
    return `${center.address.address}, ${center.address.city} ${center.address.country}`
  }
  
  ngOnInit(){
    this.getCenters();
  }
  
  private getCenters(): void {
    this.centerService
        .getCenters()
        .subscribe(centers => {
          this.centers = centers;
          
        })
  }
}
