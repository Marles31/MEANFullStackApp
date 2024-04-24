import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  HttpClient = inject(HttpClient);
  baseUrl = 'http://localhost:27017/api/songs';

  getAll() {

    return firstValueFrom(
      this.HttpClient.get<any[]>(this.baseUrl)
    );
  }

  getById(songId: string) {
    return firstValueFrom(
      this.HttpClient.get<any>(`${this.baseUrl}/${songId}`)
    );
  }

  create(formValues: any) {
    return firstValueFrom(
      this.HttpClient.post<any>(this.baseUrl, formValues)
    );
  }

  update(songId: string, formValues: any) {
    return firstValueFrom(
      this.HttpClient.put<any>(`${this.baseUrl}/${songId}`, formValues)
    );
  }

  deleteById(songId: string) {
    return firstValueFrom(
      this.HttpClient.delete<any>(`${this.baseUrl}/${songId}`)
    );
  }

}
