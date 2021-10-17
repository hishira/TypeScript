import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from './components/about/about.component';
import {ShelterComponent} from "./components/shelter/shelter.component";
import {CatsComponent} from "./components/pets/cats/cats.component";
const router: Routes = [
  { path: '', component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path:"shelter/:id", component: ShelterComponent},
  { path: "pets/cats", component: CatsComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(router)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
