import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';



import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFomrulario: FormGroup = this.fb.group({
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }



  login() {
    console.log('valor', this.miFomrulario.value);
    // console.log('valid:', this.miFomrulario.valid);

    const {email, password} = this.miFomrulario.value

    this.authService.login(email, password).subscribe(resp => {

      // el observable devuelve un boleano como respuesta de la peticion, 
      // entonces hacemos la consulta de si la peticion es correcta (true) entonces navegamos,
      // caso contrario (actual el catcherror del servicio) salta error y mostramos el mensaje mediante un sweetalert
      if (resp === true) {

        this.router.navigateByUrl('/dashboard')
      } else {
        
        // Swal.fire('Error', resp, 'error')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: resp
        })
      }
    })

    

    
  }

}
