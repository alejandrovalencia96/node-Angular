import { Component, OnInit, HostBinding } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // @HostBinding('class') classes = 'row';

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(login: NgForm){
 
    if(login.invalid){
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.authService.login(this.usuario).subscribe(
      res => {
       console.log(res);
       Swal.close();

       if(this.recordarme){
         localStorage.setItem('email', this.usuario.email);
       }
       console.log("entra");
       this.router.navigate(['/games']);

      },
      err => {
      console.error(err.error)
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.text
      });
      }
    )

  }

}
