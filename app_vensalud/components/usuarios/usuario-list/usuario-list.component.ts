import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { PdfMakeWrapper, Table } from 'pdfmake-wrapper';
import { UserService } from '../../../services/user.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ExcelService } from '../../../services/excel.service';


@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  usuarios: any = [];
  filter: '';
  paginate = 1;


  constructor(
    private userService: UserService,
    private excelService: ExcelService)
   { }

  ngOnInit() {
    this.getUsuarios();
  }



 
  getUsuarios()
  {
    this.userService.getUsuarios().subscribe(res => {
      this.usuarios = res;
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

  const col = ['Nombre', 'Correo Electronico', 'Fecha Creacion'];
  const rows = [];
  

  this.usuarios.forEach(element => {
    const temp = [element.name, element.email, element.created_at];

    rows.push(temp);

});

      doc.autoTable(col, rows, { startY: 10 });
      doc.save('Test.pdf');

}


exportAsXLSX():void {
  this.excelService.exportAsExcelFile(this.usuarios, 'usuarios');
}




  imprimirPDF() {
  
 
 
    var doc = new jsPDF()
    // It can parse html:
    doc.autoTable({ html:'#my-table' })
   
    // Or use javascript directly:
    doc.autoTable({
      head: [['Nombre', 'Correo Electronico', 'Fecha Creacion']],
      body: this.usuarios
    });
   
    doc.save('table.pdf');

  }


  






}
