import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import { CombolistService } from 'src/app/services/combolist.service';
import { VacunasService } from 'src/app/services/vacunas.service';
import { ExcelService } from 'src/app/services/excel.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-reportes-centro-salud-registrador',
  templateUrl: './reportes-centro-salud-registrador.component.html',
  styleUrls: ['./reportes-centro-salud-registrador.component.css']
})
export class ReportesCentroSaludRegistradorComponent implements OnInit {

  centrosalud: any = [];

    // Reportes
    VacunasCentroSaludEdad: any = [];
    //VacunasEstadalEdad: any = [];
    //pdfEstadal = false;
    //estado_id = '';
    usuarios : any = [];
  

  constructor(
    private comboListService: CombolistService,
    private vacunasService:VacunasService,
    private excelService: ExcelService,
    private auth: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getReporteVacunasEdadCentroSalud()
  }


  excelVacunasPorEdadCentroSalud():void {
    this.excelService.exportAsExcelFile(this.VacunasCentroSaludEdad, 'Vacunas');
  }

  getReporteVacunasEdadCentroSalud()
{
  const params = this.activatedRoute.snapshot.params;
  this.vacunasService.reporteVacunasEdadCentroSalud(params.id).subscribe(res => {
    this.VacunasCentroSaludEdad = res;
    console.log(res);
  },
  err => {
    console.log(err);
    if (err.status === 0)
    {
      /*Swal.fire(
        'Error!',
        'El servidor no esta activo, no podra ver los datos...',
        'error'
        
      );
      */
    }
  }
 );
}

PDFCentroSalud() {
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Estado',
    'Centro Salud',
    '1-12 Años',
    '13-21 Años',
    '22-59 Años',
    '60 o Mas Años ',
    'Total'
    
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte  Por Centro de Salud De Vacunados Por Edad'});
  img.src = 'assets/images/logo.png';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte  Por Centro de Salud De Vacunados Por Edad', 310, 60);

  this.VacunasCentroSaludEdad.forEach(element => {
    const temp = [
      element.estado,
      element.centro_salud,
      element.de_1_a_12,
      element.de_13_a_21,
      element.de_22_a_59,
      element.de_60_o_mas,
      element.total, 
        
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
     
      doc.save('Reporte_vacunados_edad_centro_salud.pdf');

}



}
