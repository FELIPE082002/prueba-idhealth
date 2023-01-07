import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  @Output() disparadorProducto: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {}

  token: string = '';

  getProductos(): Observable<any> {
    return this.http.get(environment.endPoint + '/productos');
  }

  addProducto(producto: any, token: string) {
    this.token = token.replace(/['"]+/g, '');

    const headers = new HttpHeaders().set('x-token', this.token);

    return this.http.post(environment.endPoint + '/productos', producto, {
      headers: headers,
    });
  }


  deleteProducto(id: string , token:string){
    this.token = token.replace(/['"]+/g, '');

    const headers = new HttpHeaders().set('x-token', this.token);

    return this.http.delete(environment.endPoint + '/productos/' + id,{
      headers:headers
    })
  }

  editProducto(id:string,producto: any, token: string) {
    this.token = token.replace(/['"]+/g, '');

    const headers = new HttpHeaders().set('x-token', this.token);

    return this.http.put(environment.endPoint + '/productos/' + id, producto ,{
      headers:headers
    })
  }

}
