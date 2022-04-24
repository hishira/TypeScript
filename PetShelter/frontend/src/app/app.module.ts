import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeCentersComponent } from './components/home-centers/home-centers.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './components/about/about.component';
import { ShelterComponent } from './components/shelter/shelter.component';
import { ShelterpetsComponent } from './components/shelterpets/shelterpets.component';
import { PetPhotosComponent } from './components/pet-photos/pet-photos.component';
import { PetComponent } from './components/shelterpets/pet/pet.component';
import { PetsComponent } from './components/pets/pets/pets.component';
import { PetFilter } from './components/filter/pet-filter.component';
import {SharedModule} from "./components/shared/shared.module"
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    HomeCentersComponent,
    AboutComponent,
    ShelterComponent,
    ShelterpetsComponent,
    PetPhotosComponent,
    PetComponent,
    PetsComponent,
    PetFilter,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
