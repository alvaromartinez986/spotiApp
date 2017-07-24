import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  artistas:any[] = [];
  urlBusqueda:string = "https://api.spotify.com/v1/search";
  urlArtista:string = "https://api.spotify.com/v1/artists/";
  token:string = "BQAK8tPC0t2ncIdVzSMzo3Bdx5ekoFDkNdCMBRcbzaYHLLO6-fvmZ7UJkiCRivY9bEbEIikYyEhKP5trcfwanw";


  constructor(private http:Http) { }

  getArtistas( termino:string ){

    let headers = new Headers();
    headers.append( 'authorization', `Bearer ${this.token}` );

    let query = `?q=${ termino }&type=artist`;
    let url = this.urlBusqueda + query;

    return this.http.get( url, { headers } )
            .map(res =>{
                this.artistas = res.json().artists.items;
            });
  }


  getArtista( id:string ){

    let headers = new Headers();
    headers.append( 'authorization', `Bearer ${this.token}` );

    let url = this.urlArtista + id;

    return this.http.get( url, { headers } )
            .map(res =>{
                return res.json();
            });
  }

  getTop( id:string ){

    let headers = new Headers();
    headers.append( 'authorization', `Bearer ${this.token}` );

    let query = `${ id }/top-tracks?country=US`;

    let url = this.urlArtista + query;

    return this.http.get( url, { headers } )
            .map(res =>{
                return res.json().tracks;
            });
  }

}
