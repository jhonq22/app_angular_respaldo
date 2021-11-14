import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { InventarioService } from '../../../../services/inventario.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ExcelService } from '../../../../services/excel.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario-list-admin',
  templateUrl: './inventario-list-admin.component.html',
  styleUrls: ['./inventario-list-admin.component.css']
})
export class InventarioListAdminComponent implements OnInit {
  inventarios: any = [];
  searchText: string;
  filter: '';
  paginate = 1;
  usuarios: any = [];

  constructor(
    private inventarioService: InventarioService,
    private auth: UserService,
    private excelService: ExcelService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getInventarios();
    this.informacionUsuario();
  }


  informacionUsuario() {

    this.auth.profile().subscribe(
      res => {
        this.usuarios = res;

      },

      err => {
        alert('Sesion Experiada..');
        this.router.navigateByUrl('/login');

      }
    );


  }

  getInventarios()
  {
    this.inventarioService.getInventarios().subscribe(res => {
      this.inventarios = res;
      console.log(res);
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

  
  generate() {
    const doc = new jsPDF();

    const col = [
      'Centro Salud',
      'Servicio Médico',
      'Equipo',
      'Marca',
      'Modelo',
      'Serial',
      'Nro Bien Nacional',
      'Fecha Instalación',
      'Estatus Equipo'
    ];
    const rows = [];
    const img = new Image();
    img.src = 'assets/iconos/editar.png';

    this.inventarios.forEach(element => {
      const temp = [
        element.centro_salud,
        element.servicio_medico,
        element.equipo_id,
        element.marca,
        element.modelo,
        element.serial,
        element.numero_bien_nacional, 
        element.fecha_instalacion,
        element.estatu_equipo
      ];
  
      rows.push(temp);
  
  });
  
        doc.autoTable(col, rows, { startY: 20 });
        doc.addImage(img, 'PNG', 1, 2);
        doc.save('Test.pdf');
  
  }
  
  
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.inventarios, 'Inventario');
  }

}
