import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Song } from '../modules/song.module';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  url: string = environment.host + "songs"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getPlaylist(){
    return this.http.get<Song[]>(this.url);
  }

  getSearchResult(artistName: string){
    return this.http.get<Song[]>(this.url+"/search/"+artistName);
  }

  addSong(newSong: Song){
    return this.http.post<Song>(this.url+"/addSong", newSong, this.httpOptions);
  }

  checkPassword(password: string){
    return this.http.get<boolean>(this.url+"/checkPassword/"+password);
  }

  deleteSong(songId: string){
    return this.http.delete(this.url+"/deleteSong/"+songId,this.httpOptions);
  }

  getNextSong() {
    return this.http.get<Song>(environment.host+"/getNextSong");
  }
}