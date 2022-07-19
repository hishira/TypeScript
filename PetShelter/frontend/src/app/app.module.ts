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
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { PasswordForgetComponent } from './components/password-forget/password-forget.component';
import { PetSponsorComponent } from './components/pet-sponsor/pet-sponsor.component';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
@NgModule({
  bootstrap: [AppComponent],
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
    LoginComponent,
    SignUpComponent,
    PasswordForgetComponent,
    PetSponsorComponent,
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
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory:(httpLink: HttpLink)=>{
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'http://127.0.0.1:8000/graphql'
        })
      }
    }
  }],
})
export class AppModule {}
