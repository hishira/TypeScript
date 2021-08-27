import { Component, OnInit } from '@angular/core';
import { Center } from "../center";
import { CenterService } from "../center.service";

@Component({
  selector: 'app-home-centers',
  templateUrl: './home-centers.component.html',
  styleUrls: ['./home-centers.component.css']
})
export class HomeCentersComponent implements OnInit {
  centers?: Center[];
  constructor(private centerService: CenterService) { }

  ngOnInit(){
    this.getCenters();
  }
  private getCenters(): void {
    this.centerService
        .getCenters()
        .subscribe(centers => this.centers = centers)
  }
}
