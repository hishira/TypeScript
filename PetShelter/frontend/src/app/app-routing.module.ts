import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from './components/about/about.component';
import {ShelterComponent} from "./components/shelter/shelter.component";
import {PetsComponent} from "./components/pets/pets/pets.component";
import { PetComponent } from './components/shelterpets/pet/pet.component';
const router: Routes = [
  { path: '', component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path:"shelter/:id", component: ShelterComponent},
  { path: "pets/:pettype", component: PetsComponent},
  { path: "pets/:pettype", component: PetsComponent},
  { path: 'pets/:pettype/:id', component: PetComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(router)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
