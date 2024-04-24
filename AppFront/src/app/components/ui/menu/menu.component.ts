import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './../../../services/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  router = inject(Router);
  usersService = inject(UsersService);

  onClickLogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
