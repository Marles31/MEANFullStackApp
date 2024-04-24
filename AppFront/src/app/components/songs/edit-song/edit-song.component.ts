import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SongsService } from 'src/app/services/songs.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.sass']
})
export class EditSongComponent implements OnInit {

  formulario: FormGroup;
  activatedRoute = inject(ActivatedRoute);
  songsService = inject(SongsService);
  songId = signal<string>('');
  router = inject(Router);

  constructor() {
    this.formulario = new FormGroup({
      title: new FormControl(),
      artist: new FormControl(),
      genre: new FormControl(),
      album: new FormControl(),
      duration: new FormControl(),
      year: new FormControl(),
      trackNumber: new FormControl(),
      isExplicit: new FormControl()
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      const songId = params['songId'];
      this.songId.set(songId);
      const song = await this.songsService.getById(songId);

      delete song._id;
      delete song.__v;
      this.formulario.setValue(song);
    });
  }

  async onSubmit() {

    Swal.fire({
      title: 'Estás segur@ de que quieres guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.songsService.update(this.songId(), this.formulario.value);
        console.log(response);
        this.router.navigateByUrl('/songs');
        Swal.fire('Guardado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Los cambios no fueron guardados', '', 'info')
      }
    })

  }

}
