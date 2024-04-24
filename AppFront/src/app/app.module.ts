import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongsListComponent } from './components/songs/songs-list/songs-list.component';
import { DetailSongComponent } from './components/songs/detail-song/detail-song.component';
import { NewSongComponent } from './components/songs/new-song/new-song.component';

import { ReactiveFormsModule } from '@angular/forms';
import { EditSongComponent } from './components/songs/edit-song/edit-song.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MenuComponent } from './components/ui/menu/menu.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SongsListComponent,
    DetailSongComponent,
    NewSongComponent,
    EditSongComponent,
    MainPageComponent,
    RegisterComponent,
    LoginComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
