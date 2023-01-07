import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) {}

  token: string = '';

  getUsuarios(): Observable<any> {
    return this.http.get(environment.endPoint + '/usuarios');
  }

  addUsuario(usuario: any,token: string): Observable<any> {
    this.token = token.replace(/['"]+/g, '');

    const headers = new HttpHeaders().set('x-token', this.token);

    return this.http.post(environment.endPoint + '/usuarios', usuario,{
      headers:headers
    });
  }

  deleteUsuarios(id: string, token: string) {
    this.token = token.replace(/['"]+/g, '');

    const headers = new HttpHeaders().set('x-token', this.token);

    return this.http.delete(environment.endPoint + '/usuarios/' + id, {
      headers: headers,
    });
  }

  editCategoria(name: any, id: string, token: string) {
    this.token = token.replace(/['"]+/g, '');

    const headers = new HttpHeaders().set('x-token', this.token);

    return this.http.put(environment.endPoint + '/categorias/' + id, name, {
      headers: headers,
    });
  }
}
