import { Injectable } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-js';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private spotifyApi: SpotifyWebApi.SpotifyWebApiJs;
    private token: string | undefined;
    private client_id = '933d3430c2e6442eac18add3a796497d';
    private redirect_uri = "https://status-tech.github.io/vinyltify/disk";

    constructor(private router: Router) {
        this.spotifyApi = new SpotifyWebApi();
    }

    generateString(length:number) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
    
    login(): void {
        var state = this.generateString(16);
        var scope = ['user-top-read'];
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=token&show_dialog=true&scope=${scope}&state=${state}`;
    }

    setAccessToken(token: string): void {
        this.spotifyApi.setAccessToken(token);
        this.token = token;
    }

    getApi(): SpotifyWebApi.SpotifyWebApiJs {
        return this.spotifyApi;
    }

    getAccessToken(){
        return this.token;
    }
    
    logout(){
        this.spotifyApi.setAccessToken(null);
        this.router.navigate(['/']);
    }
}
