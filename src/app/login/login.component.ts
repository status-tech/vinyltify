import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import SpotifyWebApi from 'spotify-web-api-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  spotifyApi: SpotifyWebApi.SpotifyWebApiJs = new SpotifyWebApi(); // Crea una instancia de la clase 'SpotifyWebApi'

  constructor(private authService: AuthService) {}

    login(): void {
        this.authService.login();
    }
}
