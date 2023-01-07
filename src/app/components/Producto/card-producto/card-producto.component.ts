import { Component } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-card-producto',
  templateUrl: './card-producto.component.html',
  styleUrls: ['./card-producto.component.css'],
})
export class CardProductoComponent {
  constructor(private productoService: ProductosService) {}

  public productos: Array<any> = [];
  public listaProductos: Array<any> = [];

  ngOnInit() {
    this.productoService.disparadorProducto.subscribe((data) => {
      this.productos = data.productos;

      this.productos.forEach((item) => {
        this.listaProductos.push({
          nombre: item.nombre,
          precio: item.precio,
          categoria: item.categoria.nombre,
        });
      });

    });
  }
}
