import { Component, OnInit, inject, signal } from '@angular/core';
import { SongsService } from 'src/app/services/songs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent implements OnInit {

  arrSongs = signal<any[]>([]);
  arrSongsCopy = signal<any[]>([]);

  songsService = inject(SongsService);

  constructor() { }

  async ngOnInit() {
    const songs = await this.songsService.getAll();
    this.arrSongs.set(songs);
  }

  async onClickBorrar(songId: string) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
      title: 'Estás seguro de eliminar la canción?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {

        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'La canción ha sido eliminada.',
          'success'
        )
        const song = await this.songsService.deleteById(songId);
        console.log(song);

        if (!song.error) {
          const songs = await this.songsService.getAll();
          this.arrSongs.set(songs);
        } else {
          console.log(song.error);
        }

      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La canción no ha sido eliminada :)',
          'error'
        )
      }
    })
  }

  //Búsqueda dinámica de canciones por titulo (método search)

  search (event: any) {
    console.log(event.target.value);
  }



}
