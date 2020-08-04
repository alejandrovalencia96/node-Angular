import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  registro(form: NgForm){

    if(form.invalid){
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.authService.saveUser(this.usuario).subscribe(
      res =>{
        console.log(res);
        Swal.close();
        if(this.recordarme){
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/games');
      },
      err => {console.error(err.error);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.text
        });
      }
    )

  }

}
