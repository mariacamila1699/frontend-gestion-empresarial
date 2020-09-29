import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router  } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

//Importamos el servicios
import {  LoginService } from '../../services/login/login.service';

//Variable que se utliza para la alerta
declare var swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {
  
  login: FormGroup;
  submitted = false;

  options: AnimationOptions = {
    path: '/assets/camila.json',
  };

  constructor( 
    private formBuilder: FormBuilder, 
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
    
    //Cuando se carga el componente preparamos la validación del formulario
    this.login = this.formBuilder.group({
      usuario_empleado: ['', Validators.required],
      contrasena_empleado: ['', Validators.required]
    });
  }

  //Retornamos al formulario los controles de validación
  get validate() { return this.login.controls; }

  //Obtenemos los datos del formulario con form?: NgForm
  onSubmit(form?: NgForm) {
    
    this.submitted = true;

    console.log(form.value)
    
    this.loginService.PostLogin(form.value)
    .subscribe(response => {

      if(response.status) {
        this.router.navigate(['/dashboard']);
      }else {
        swal({
              type: 'error',
              title: 'Autenticación',
              text: response.message,
          })
      }

    });
  }
}
