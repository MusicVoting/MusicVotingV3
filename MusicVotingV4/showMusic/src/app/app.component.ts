import { Component, OnInit } from '@angular/core';
import { Song } from './modules/song.module';
import { SongService } from './services/song.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'showMusic';
  isPlaying = false;
  window?: Window|null;

  actSong: Song = {
    videoUrl: '',
    duration: 0,
    songId: '',
    songName: '',
    thumbnail: '',
    artist: { idArtist: '', strArtist: '' },
  };

  constructor(
    private songService: SongService,
    private _sanitizer: DomSanitizer
  ) {}

  songs: Song[] = [];
  actIndex: number = -1;

  ngOnInit(): void {
    interval(2000).subscribe((x) => {
      this.songService.getPlaylist().subscribe({
        next: (result) => {
          this.songs = result;
        },
      });
    });
  }

  goToLink(song: Song) {
    window.open(song.videoUrl, '_blank');
  }


  playNextSong() {
    if (this.isPlaying == true) {

      this.songService.getNextSong().subscribe({
        next: (song) => {
          if (song != null) {
            this.actSong = song;
            console.log(song.artist.strArtist);
            this.window = window.open(
              song.videoUrl,
              '',
              'toolbar=no,scrollbars=no,resizable=no,top=200,left=500,width=100,height=100,menubar=no,titlebar=no'
            );


            setTimeout(() => {
              console.log('song vorbei');

              if (this.window != null ) {
                console.log('fenster schließen');
                this.window.close();
              }

              this.playNextSong();
            }, 25000);
          } else {
            console.log('Playlist ende');
            song = {
              artist: { strArtist: '', idArtist: '' },
              videoUrl: '',
              duration: 0,
              songId: '',
              songName: '',
              thumbnail: '',
            };
            this.isPlaying = false;
          }
        },
      });
    }
  }

  playSong() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying == true) {
      this.playNextSong();
    }
    else{
      if(this.window != null){
        this.window.close()
      }
    }
  }

  /*TODO
  fenster nicht in den vordergrund so groß
  Reihenfolge spielen
  groß den aktuellen song

  */
}