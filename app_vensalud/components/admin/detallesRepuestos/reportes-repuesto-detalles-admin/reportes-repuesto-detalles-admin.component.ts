import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import { ComboListService } from 'src/app/services/combo.service';
import { ExcelService } from 'src/app/services/excel.service';


@Component({
  selector: 'app-reportes-repuesto-detalles-admin',
  templateUrl: './reportes-repuesto-detalles-admin.component.html',
  styleUrls: ['./reportes-repuesto-detalles-admin.component.css']
})
export class ReportesRepuestoDetallesAdminComponent implements OnInit {

  //reportes
  EstadalRepuestoSolicitados: any = [];
  estado_id = '';
  estados: any = [];
  pdfrepuesto = false;

  createFormGroup() {
    return new FormGroup({
       estado_id: new FormControl('', [Validators.required]),
      
    });
  }

  Form: FormGroup;

  constructor(
    private comboListService: ComboListService,
    private activatedRoute: ActivatedRoute,
    private excelService: ExcelService,
  ) { this.Form = this.createFormGroup();}

  ngOnInit() {
    this.getEstados();
  }
  getEstados()
  {
    this.comboListService.getEstados().subscribe(res => {
      this.estados = res;
      console.log(res);
    },
    err => {
      console.log(err);
    }
   );
  }


  // REPORTE 1 TOTAL DE DOSIS //
  excelVacunasTotalDosis():void {
    this.excelService.exportAsExcelFile(this.EstadalRepuestoSolicitados, 'repuestos');
  }

  getReporteRepuestosSolicitados()
{
  const params = this.activatedRoute.snapshot.params;
  this.comboListService.ReportePDFEstadalDetallesRepuestosInventario(this.Form.value.estado_id).subscribe(res => {
    this.EstadalRepuestoSolicitados = res;
    this.pdfrepuesto = true;
    console.log(res);
  },
  err => {
    console.log(err);
    if (err.status === 0)
    {}
  }
 );
}

PDFSolicitadoRepuesto() {
  const doc = new jsPDF('l', 'pt', "a4");

  const col = [
    'Estado',
    'Centro Salud' ,
    'Marca',
    'Modelo',
    'Equipo',
    'Repuesto',
    'Cantidad Solicitado',
    'Fecha Solicitud'
    
  ];
  const rows = [];
  const img = new Image();
  doc.setProperties({title: 'Reporte De Repuestos Solicitados '});
  img.src = 'assets/logo_vensalud.jpg';
  doc.addImage(img, 'JPGE', 50,8);
  doc.setFontSize(20);
  doc.text('Reporte De Repuestos Solicitados ', 310, 60);

  this.EstadalRepuestoSolicitados.forEach(element => {
    const temp = [
      element.estado,
      element.centro_salud,
      element.marca,
      element.modelo,
      element.equipo,
      element.nombre_repuesto,
      element.cantidad_pedido,
      element.fecha_solicitud
      
      
  
        
    ];

    rows.push(temp);

});

     doc.autoTable(col, rows, 
                             
                { 
                 startY: 150,
                 columnStyles: { 
                   0: {cellWidth: 90},
                   1: {cellWidth: 90},
                   2: {cellWidth: 90}, 
                   3: {cellWidth: 90}, 
                   4: {cellWidth: 90},
                   5: {cellWidth: 90},   
                  
                  }
                
                });
     
      doc.save('Reporte_Dosi_Total_Estados.pdf');

}


  // REPORTE 1 TOTAL DE DOSIS //











}
