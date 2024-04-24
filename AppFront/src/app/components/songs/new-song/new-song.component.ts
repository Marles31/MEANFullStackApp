import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SongsService } from 'src/app/services/songs.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.scss']
})
export class NewSongComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  songsService = inject(SongsService);
  router = inject(Router);

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      genre: ['', Validators.required],
      album: ['', Validators.required],
      duration: ['', Validators.required],
      year: ['', Validators.required],
      trackNumber: ['', Validators.required],
      isExplicit: false
    })
  }


  get title() {
    return this.formulario.get('title');
  }

  get artist() {
    return this.formulario.get('artist');
  }

  get genre() {
    return this.formulario.get('genre');
  }

  get album() {
    return this.formulario.get('album');
  }

  get duration() {
    return this.formulario.get('duration');
  }

  get year() {
    return this.formulario.get('year');
  }

  get trackNumber() {
    return this.formulario.get('trackNumber');
  }

  get isExplicit() {
    return this.formulario.get('isExplicit');
  }

  async onSubmit() {
    const response = await this.songsService.create(this.formulario.value);
    console.log(response);
    this.formulario.reset();
    Swal.fire(
      'Canción creada con exito!',
      'Presiona ok para continuar!',
      'success'
    )
    this.router.navigateByUrl('/songs');
  }
  
}
