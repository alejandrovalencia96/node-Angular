import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = 'http://localhost:3000/api';

  userToken: string;

  constructor(private http: HttpClient) {
    this.leerToken();
   }


  logout(){
   localStorage.removeItem('token');
  }

  login(usuario:UsuarioModel){
    return this.http.post(`${this.API_URI}/auth/login`, usuario)
    .pipe(
      map(res => {
        this.guardarToken(res['token']);
        return res;
      })
    );
  }


  saveUser(usuario: UsuarioModel){
    return this.http.post(`${this.API_URI}/auth/register`, usuario)
    .pipe(
      map(res => {
        this.guardarToken(res['token']);
        return res;
      })
    );
  }

  private guardarToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());

  }


  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }

    return this.userToken;
  }


  estaAutenticado(): boolean {

    if(this.userToken.length < 2){
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if(expiraDate > new Date()){
      return true;
    }else{
      return false;
    }

  }


  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }


}
