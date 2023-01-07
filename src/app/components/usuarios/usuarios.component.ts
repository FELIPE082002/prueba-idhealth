import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  
  public listaUsuarios: Array<any> = [];
  token: string = '';

  constructor(private usuariosService: UsuariosService){ }

  usuarioForm = new FormGroup({
    nombre: new FormControl(),
    correo: new FormControl(),
    pass: new FormControl(),
  })

  onSubmit(nombre:string = '',correo:string = '',pass:string = '',rol:string = '',){
    nombre = this.usuarioForm.value.nombre
    correo = this.usuarioForm.value.correo
    pass = this.usuarioForm.value.pass

    const usuario = {nombre:nombre,correo:correo,password:pass,rol:'ADMIN_ROLE'}

    this.usuariosService.addUsuario(usuario,this.token).subscribe((data) => {
      console.log(data)
      this.ngOnInit()
    })
  }

 onDelete(id:string){
  this.usuariosService.deleteUsuarios(id,this.token).subscribe((data)=>{
    console.log(data)
    this.ngOnInit()
  })
 }

  ngOnInit(){
    this.listaUsuarios = []
    this.token = JSON.stringify(localStorage.getItem('x-token'));

    this.usuariosService.getUsuarios().subscribe((data)=>{
      this.listaUsuarios = data.usuarios

      console.log(this.listaUsuarios)
    })
  }
}


        // const usuario = {id: user._id, nombre: user.nombre, rol: user.rol}
        // console.log(usuario)
        // this.listaUsuarios.push(usuario)