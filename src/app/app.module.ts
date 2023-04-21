import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';
import { DiskComponent } from './disk/disk.component';


const appRoutes:Routes=[
  {path:'', component: LoginComponent},
  {path:'disk', component: DiskComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DiskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://api.spotify.com'],
        sendAccessToken: true
      }
    })
  ],
  providers: [
// agrega tu servicio aquí
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
