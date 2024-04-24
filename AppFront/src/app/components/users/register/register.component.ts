import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from './../../../services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  usersService = inject(UsersService);
  router = inject(Router);

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    })
  }

  get username(){
    return this.formulario.get('username');
  }

  get email(){
    return this.formulario.get('email');
  }

  get password(){
    return this.formulario.get('password');
  }

  async onSubmit() {

    try{
      const response = await this.usersService.register(this.formulario.value);
      console.log(response);
      Swal.fire(
        'Registro correcto!',
        'Presiona ok para continuar!',
        'success'
      )
      this.router.navigateByUrl('/login');
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
