import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent {
  constructor(
    private router: Router,
    private categoriaService: CategoriasService
  ) {}

  public categorias: Array<any> = [];
  public listaCategorias: Array<any> = [];
  public token: string = '';
  public urlActual: string = '';
  public edit: boolean = true;

  categoriaForm = new FormGroup({
    nombre: new FormControl(),
    newNombre: new FormControl()
  });

  onSubmit(nombre: any) {
    nombre = this.categoriaForm.value.nombre;

    const categoria = { nombre: nombre };

    this.categoriaService.addcategoria(categoria, this.token).subscribe(
      (data) => {
        this.ngOnInit();
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onDelete(id: string) {
    this.categoriaService.deleteCategoria(id, this.token).subscribe((error) => {
      this.ngOnInit();
      console.log(error);
    });
  }

  onEdit(id: string, nombre: any){
    nombre = this.categoriaForm.value.newNombre;

    const categoria = { nombre: nombre };

    this.categoriaService.editCategoria(categoria,id,this.token).subscribe((data) => {
      console.log(data)
      this.ngOnInit()
    })

  }

  activeEdit(id: string,nombre:any) {
    this.categoriaForm.setValue({nombre:'', newNombre: nombre})
    
    this.listaCategorias.forEach(item =>{
   
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
    this.listaCategorias = [];
    this.token = JSON.stringify(localStorage.getItem('x-token'));
    this.urlActual = this.router.url;

    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data.categorias;

      this.categorias.forEach((item) => {
        const catg = { id: item._id, nombre: item.nombre, edit: true };

        this.listaCategorias.push(catg);
      });

      this.categoriaService.disparadorCategoria.emit(this.listaCategorias)

    });
    
  }
}
