import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
