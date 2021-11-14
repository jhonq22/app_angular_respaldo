import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { API_URI } from '../interfaces/interface';


export interface UserDetails {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
  nombre_img: string;
  ente_id: number;
  rol_id: number;
  centro_salud_id: number;
  estado_id: number;
  exp: number;
  iat: number;
 }

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  image?: string;
  nombre_img?: string;
  ente_id?: number;
  rol_id?: number;
  centro_salud_id?: number;
  estado_id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: string;

  constructor(
    private http: HttpClient, 
    private router: Router, 
    
    ) {}


  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 3000;
    } else {
      return false;
    }
  }


  public register(user: TokenPayload): Observable<any> {
    return this.http.post(`${API_URI}/register`, user);
  }


  public login (user: TokenPayload): Observable<any> {
    const base = this.http.post(`${API_URI}/login`,
    {email: user.email, password: user.password },
    {
      headers: {'Content-Type': 'application/json'},

    }
    );
    console.log(user);

    const request = base.pipe( map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
          console.log(data.token);
        }
       })
       
      );

    

    return request;

  }




  public profile(): Observable<any> {
    return this.http.get(`${API_URI}/profile`, {
      headers: { Authorization: `Bearer ${this.getToken()}`
     }
      
    });
   
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('usertoken');
    this.router.navigateByUrl('/login');
  }









  
// CRUD //


  getUsuarios() {
    return this.http.get(`${API_URI}/usuarios`);
  }


  getUsuariosConfiguracion() {
    return this.http.get(`${API_URI}/user/list/configuracion`);
  }

  getUsuario(id: string) {
    return this.http.get(`${API_URI}/usuarios/${id}`);
  }


  actualizarPassword(id: string|number, updatedUsuario: TokenPayload): Observable<TokenPayload> {
    return this.http.put(`${API_URI}/user/actualizar/password/${id}`, updatedUsuario);
  }



  updateUsuario(id: string|number, updatedUsuario: TokenPayload): Observable<TokenPayload> {
    return this.http.put(`${API_URI}/usuarios/${id}`, updatedUsuario);
  }



  deleteUsuario(id: string|number) {
    return this.http.delete(`${API_URI}/usuarios/${id}`);
  }

}
