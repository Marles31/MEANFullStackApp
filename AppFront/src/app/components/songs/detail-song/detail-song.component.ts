import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongsService } from './../../../services/songs.service';

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.scss']
})
export class DetailSongComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  songsService = inject(SongsService);

  song = signal<any>({});

  constructor() { }

  ngOnInit(){
    this.activatedRoute.params.subscribe(async params => {
      const song = await this.songsService.getById(params['songId']);
      this.song.set(song);
    })
  }

}
