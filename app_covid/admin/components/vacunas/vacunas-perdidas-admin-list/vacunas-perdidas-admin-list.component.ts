import { Component, OnInit } from '@angular/core';
import { VacunasService } from 'src/app/services/vacunas.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-vacunas-perdidas-admin-list',
  templateUrl: './vacunas-perdidas-admin-list.component.html',
  styleUrls: ['./vacunas-perdidas-admin-list.component.css']
})
export class VacunasPerdidasAdminListComponent implements OnInit {

  vacunas: any = [];
  vacunasExcel: any = [];
  filter: '';
  paginate = 1;


  constructor(private vacunasService: VacunasService,
    private excelService: ExcelService ) { }

  ngOnInit() {
    this.getVacunaPerdidas();
    this.getVacunaPerdidasExcel();
  }


  getVacunaPerdidas()
  {
    this.vacunasService.getVacunaPerdidas().subscribe(res => {
      this.vacunas = res;
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





  getVacunaPerdidasExcel()
  {
    this.vacunasService.VacunasPerdidasExcelTodos().subscribe(res => {
      this.vacunasExcel = res;
      //console.log(res);
               
    },
      );
  }


  ExcelGeneral():void {

this.getVacunaPerdidas();
      // this.vacunas.splice(0, 1);
    this.excelService.exportAsExcelFile(this.vacunasExcel, 'Vacunas');
  }


  PDFGeneral() {
    const doc = new jsPDF('l', 'pt', "a4");
  
    const col = [
      'Tipo de Vacuna',
      'Numero de Lote',
      'Fecha de Vencimiento',
      'Numero de Dosis Perdidas',
      'Usuario',
      'Estado',
      'Centro de Salud'
     
      
    ];
    const rows = [];
    const img = new Image();
    doc.setProperties({title: 'Reporte General De Vacunas Perdidas'});
    img.src = 'assets/images/logo.png';
    doc.addImage(img, 'JPGE', 50,8);
    doc.setFontSize(20);
    doc.text('Reporte General De Vacunas Perdidas', 310, 60);
  
    this.vacunas.forEach(element => {
      const temp = [
        element.nombre_vacuna,
        element.numero_lote,
        element.fecha_vencimiento,
        element.numero_dosis_perdidas,
        element.name,
        element.estado,
        element.centro_salud,
       
          
      ];
  
      rows.push(temp);
  
  });
  
       doc.autoTable(col, rows, 
                               
                  { 
                   startY: 150,
                   columnStyles: { 
                     0: {cellWidth: 110},
                     1: {cellWidth: 110},
                     2: {cellWidth: 110}, 
                     3: {cellWidth: 110}, 
                     4: {cellWidth: 110},  
                    
                    }
                  
                  });
       
        doc.save('Reporte_vacunas_perdidas.pdf');
  
  }
  
  // AQUI TERMINA REPORTE GENERAL


















}
