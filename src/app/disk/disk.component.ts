import {Component, Injectable, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import SpotifyWebApi from 'spotify-web-api-js';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-disk',
  templateUrl: './disk.component.html',
  styleUrls: ['./disk.component.css']
})
export class DiskComponent implements OnInit{
  
  actual = 'b1';
 
  constructor(private authService: AuthService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    const tieneError = this.route.snapshot.queryParams['error'] !== undefined;
    if(tieneError == false){
      // @ts-ignore
      const token = this.route.snapshot.fragment.split('&')
          .find(fragment => fragment.includes('access_token'))
          .split('=')[1];
      // Guardar el token de acceso en el servicio de autenticación
      this.authService.setAccessToken(token);
      this.getMe();
      this.getMyTracks('short_term');
    }
    else{
      this.logout();
    }
  }
  
  getMe(){
   var a = this.authService.getApi().getMe()
   a.then((data) =>{
     const elemento = document.getElementById('nombreCliente') as HTMLInputElement
     if(data.display_name){
       elemento.outerHTML = data.display_name;
     }
     else{
       elemento.outerHTML = data.id;
     }
    })
  }
  
  abrir(link:string){
    window.open(link, '_blank');
  }
  
  ponerFoto(link:string){
    const album = document.getElementById('fotoAlbum') as HTMLInputElement
    album.style.backgroundImage = `url('${link}')`
  }
  
  modificadorBoton(time:string){
    var but = null;
    const tipo = document.getElementById('tipo') as HTMLInputElement;
    if(time == 'short_term'){
      but = 'b1';
      tipo.innerHTML = 'Last Month'
    }
    else if(time == 'medium_term'){
      but = 'b2';
      tipo.innerHTML = 'Last 6 Months';
    }
    else{
      but = 'b3';
      tipo.innerHTML = 'All Time';
    }
    
    
    const aux = document.getElementById(this.actual) as HTMLInputElement;
    aux.className = 'btn btn-outline-secondary btn-lg btn-block rounded';

    const tmp = document.getElementById(but) as HTMLInputElement;
    tmp.className = 'btn btn-secondary btn-lg btn-block rounded';
    this.actual = but;
  }
  
  getMyTracks(time:string){
    this.modificadorBoton(time);
    this.authService.getApi().getMyTopTracks({
      time_range: time,
      limit:10,
    }).then((response) => {
      this.ponerFoto(response.items[0].album.images[0].url)
      for (let i = 0; i < response.items.length; i++) {
        const cancion = document.getElementById(`cancion${i+1}`) as HTMLInputElement
        cancion.innerHTML = `${i+1}. ${response.items[i].name}`;
        cancion.className = 'cursor';
        cancion.addEventListener('click', () => {
          this.abrir(response.items[i].uri);
        });
      }
    }, (err) =>{
      this.logout();
    })
  }
  
  logout(){
    this.authService.logout()
  }
}
