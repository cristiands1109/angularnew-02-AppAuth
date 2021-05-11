import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

// enviorement
import { environment } from 'src/environments/environment';

// interface
import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseURL: string = environment.baseURL;
  private _usuario!: Usuario;


  get usuario() {
    return {...this._usuario};
  }

  constructor( private http: HttpClient) { }


  registro(name: string, email: string, password: string ) {

    const url = `${this._baseURL}/auth/new`;
    const body = {name, email, password};

    return this.http.post<AuthResponse>(url, body).pipe(
      tap(resp => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token!)
          
        }
      }),
      map(valido => valido.ok), catchError(errPeticion => of(errPeticion.error.msg))
    );

  }

  login(email: string, password: string) {

    const url = `${this._baseURL}/auth`;
    const body = {email, password};

    // hacemos la peticion
    // utilizamos el pipe tap para ejecutar una secuencia para poder almacenar los datos del usuario y poder mostrarlo luego
    // utilizamos el pipe map para mutar la respuesta o desestructurar y trabajar con la variable este caso el si la peticion es correcta o no
    // utilizamos el catch error para capturar el error (mensaje) y lo convertimos en un observable con el OF
    return this.http.post<AuthResponse>(url, body).pipe(
      tap(resp => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token!)
        
        }
      }),
      map(valido => valido.ok),
      catchError(errPeticion => of(errPeticion.error.msg))
    );
    
  }

  validarToken():Observable<boolean> {
    const url = `${this._baseURL}/auth/renew`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');


    return this.http.get<AuthResponse>(url, {headers}).pipe(
      map(resp => {
        localStorage.setItem('token', resp.token!)
          this._usuario = {
            name: resp.name!,
            userID: resp.userID!,
            email: resp.email!
          }
        return resp.ok;
      }), catchError(errPeticion => of(false))
    )
  }


  logOut() {
    localStorage.clear();
    
  }






}