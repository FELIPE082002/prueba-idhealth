import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  token: string = '';
  public listaProductos: Array<any> = [];

  constructor(
    private productoService: ProductosService,
    private categoriasService: CategoriasService
  ) {}

  productoForm = new FormGroup({
    nombre: new FormControl(),
    idCategoria: new FormControl(),
  });

  onSubmit(idCategoria: string = '', nombre: string = '') {
    nombre = this.productoForm.value.nombre;
    idCategoria = this.productoForm.value.idCategoria;

    const producto = { nombre: nombre, categoria: idCategoria };

    this.productoService.addProducto(producto, this.token).subscribe(
      (data) => {
        console.log(data)
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.token = JSON.stringify(localStorage.getItem('x-token'));

    this.productoService.getProductos().subscribe((data) => {
      this.productoService.disparadorProducto.emit(data);
    });

    this.categoriasService.disparadorCategoria.subscribe((data) => {
      this.listaProductos = data;
    });
  }
}
