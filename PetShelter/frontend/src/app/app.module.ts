import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeCentersComponent } from './home-centers/home-centers.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { ShelterComponent } from './shelter/shelter.component';
import { ShelterpetsComponent } from './shelterpets/shelterpets.component'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    HomeCentersComponent,
    AboutComponent,
    ShelterComponent,
    ShelterpetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
