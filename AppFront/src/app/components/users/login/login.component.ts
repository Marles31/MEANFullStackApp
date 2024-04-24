import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from './../../../services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  usersService = inject(UsersService);
  router = inject(Router);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    })
  }

get email(){
  return this.formulario.get('email');
}

get password(){
  return this.formulario.get('password');
}

async onSubmit() {

  try{
  const response = await this.usersService.login(this.formulario.value);
  if(!response.error){
    localStorage.setItem('token', response.token);
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: 'success',
    title: 'Inicio de sesión correcto!',
  })

  console.log(response);
  this.router.navigateByUrl('/songs');

  }catch(error){

    console.log(error);

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salió mal!',
    })

  }
}

}
