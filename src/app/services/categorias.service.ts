import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {

  @Output() disparadorCategoria: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {}

  token: string = '';

  getCategorias(): Observable<any> {
    return this.http.get(environment.endPoint + '/categorias');
  }

  addcategoria(categoria: any, token: string): Observable<any> {
    this.token = token.replace(/['"]+/g, '');

    const headers = new HttpHeaders()
      .set('x-token', this.token);

    return this.http.post(environment.endPoint + '/categorias', categoria, {
      headers: headers,
    });
  }

  deleteCategoria(id: string, token: string) {
    this.token = token.replace(/['"]+/g, '');

    const headers = new HttpHeaders().set('x-token', this.token);

    return this.http.delete(environment.endPoint + '/categorias/' + id, {
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
