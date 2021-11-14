import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InventarioService } from '../../../services/inventario.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-estadalinventarios-no-operativos',
  templateUrl: './estadalinventarios-no-operativos.component.html',
  styleUrls: ['./estadalinventarios-no-operativos.component.css']
})
export class EstadalinventariosNoOperativosComponent implements OnInit {
  inventarios: any = [];
  searchText: string;
  usuarios: any = [];
  filter: '';
  paginate = 1;
  usuarioestadal = '';

  constructor(
    private inventarioService: InventarioService,  private auth: UserService, private router: Router
  ) { }

  ngOnInit() {
    this.informacionUsuario();
   // this.getInventarios();
    
  }

  informacionUsuario() {

    this.auth.profile().subscribe(
      res => {
        this.usuarios = res;
        this.usuarioestadal = this.usuarios.user.estado_id;


        this.inventarioService.getInventariosNoOperativoEstadal(this.usuarioestadal).subscribe(res => {
          this.inventarios = res;
          console.log(res);
          // alert(this.usuarioestadal);
        },
       );





      },

      err => {
        console.log(err);
        if (err.status === 0)
        {
          Swal.fire(
            'Error!',
            'El servidor no esta activo, no podra ver los datos...',
            'error'
          );
        }
      }
    );


  }




}
