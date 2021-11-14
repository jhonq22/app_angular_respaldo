import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventarioService } from '../../../../services/inventario.service';
import jsPDF from 'jspdf';
import { ExcelService } from '../../../../services/excel.service';


@Component({
  selector: 'app-inventario-list-estadal-estados',
  templateUrl: './inventario-list-estadal-estados.component.html',
  styleUrls: ['./inventario-list-estadal-estados.component.css']
})
export class InventarioListEstadalEstadosComponent implements OnInit {

 
  inventarios: any = [];
  filter: '';
  paginate = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private inventarioService: InventarioService,
    private excelService: ExcelService
  ) { }

  ngOnInit() {


   
    const params = this.activatedRoute.snapshot.params;
    if (params.id) 
          {
            this.inventarioService.getInventariosPorEstados(params.id)
              .subscribe(
                res => { // aqui tomo las respuesta
                  console.log(res);
                  this.inventarios = res;
                },
                err => console.log(err)
              );
          }
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
      
          this.inventarios.forEach(element => {
            const temp = [
              element.centro_salud,
              element.servicio_medico,
              element.equipo,
              element.marca,
              element.modelo,
              element.serial,
              element.numero_bien_nacional, 
              element.fecha_instalacion,
              element.estatu_equipo
            ];
        
            rows.push(temp);
        
        });
        
              doc.autoTable(col, rows, { startY: 10 });
              doc.save('LiSTADO_INVENTARIO_ESTADAL.pdf');
        
        }
        
        
        exportAsXLSX():void {
          this.excelService.exportAsExcelFile(this.inventarios, 'Inventario');
        }
}
