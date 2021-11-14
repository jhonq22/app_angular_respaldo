import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { UserService } from '../../../../services/user.service';
import { InventarioService } from '../../../../services/inventario.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-inventario-estadistica-centro-salud-unico',
  templateUrl: './inventario-estadistica-centro-salud-unico.component.html',
  styleUrls: ['./inventario-estadistica-centro-salud-unico.component.css']
})
export class InventarioEstadisticaCentroSaludUnicoComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
    
  };
// charts pie
  public pieChartLetra: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)', 
        'rgba(0,255,0,0.3)', 
        'rgba(0,0,255,0.3)', 
        'rgba(253, 228, 0, 0.8)', 
        'rgba(92, 11, 54, 1)'],
    },
  ];


  usuarios: any = [];
  inventarioestatus: any = [];
  totalinventarios: any = [];

   

  constructor(
    private auth: UserService,
    private inventarioService: InventarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {

    this.auth.profile().subscribe(
      res => {
        this.usuarios = res;
        console.log(res);

          //total de inventario en el centro salud

        this.inventarioService.cantidadTotalInventarioCentroSalud(this.usuarios.user.centro_salud_id).subscribe( respuesta => {
          this.totalinventarios = respuesta;
          });


        this.inventarioService.getContarInventarioEstatusCentroSalud(this.usuarios.user.centro_salud_id).subscribe( res => {
          this.inventarioestatus = res;
          console.log(res);
         // estastica de pie char
          this.inventarioestatus.forEach(element => {
    
            const label: any = [element.estatu_equipo];
            const data: any = [element.equipos];
    
            this.pieChartLetra.push(label);
            this.pieChartData.push(data);
          });
    
        },
        err => {
          alert('error data inventario..');
    
          }
        );


      },

      err => {
        alert('Sesion Experiada..');
        this.router.navigateByUrl('/login');

      }
    );

  }


}
