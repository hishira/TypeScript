import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from './about/about.component';
import {ShelterComponent} from "./shelter/shelter.component";
const router: Routes = [
  { path: '', component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path:"shelter/:id", component: ShelterComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(router)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
