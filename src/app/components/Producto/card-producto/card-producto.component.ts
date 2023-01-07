import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductosComponent } from '../productos/productos.component';

@Component({
  selector: 'app-card-producto',
  templateUrl: './card-producto.component.html',
  styleUrls: ['./card-producto.component.css'],
})
export class CardProductoComponent {
  token: string = '';
  public productos: Array<any> = [];
  public listaProductos: Array<any> = [];

  constructor(private productoService: ProductosService ,private productosComponent: ProductosComponent) {}

  public cardProductForm = new FormGroup({
    nombre: new FormControl(),
  })

  onDelete(id:string){
    this.productoService.deleteProducto(id,this.token).subscribe((data)=>{
      console.log(data)
      this.productosComponent.ngOnInit()
    })
  }

  onEdit(id: string, nombre: string = '', idCategoria:string){
    nombre = this.cardProductForm.value.nombre;

    const categoria = { nombre: nombre , categoria: idCategoria};

    this.productoService.editProducto(id,categoria,this.token).subscribe((data) => {
      console.log(data)
      this.productosComponent.ngOnInit()
    })

  }

  activeEdit(id: string,nombre:any) {
    this.cardProductForm.setValue({nombre: nombre})
    
    this.listaProductos.forEach(item =>{
   
      if(item.id == id){
        if(item.edit){
          item.edit = false
        }else{
          item.edit = true
        }
      }
    
    })
  }

  ngOnInit() {
    this.token = JSON.stringify(localStorage.getItem('x-token'));

    this.productoService.disparadorProducto.subscribe((data) => {
      this.productos = data.productos;

      this.listaProductos = []

      this.productos.forEach((item) => {
        this.listaProductos.push({
          edit: true,
          nombre: item.nombre,
          precio: item.precio,
          categoria: item.categoria.nombre,
          idCategoria: item.categoria._id,
          id: item._id
        });
      });

    });
  }
}
