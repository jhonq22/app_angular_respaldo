import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { UserDetails, UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { InventarioService } from '../../../services/inventario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


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






// AQUI TERMINA EL CHART PIE






  // Chart dynamic

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };


  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];



  //AQUI TERMINA EL CHART DINAMICO


  usuarios: any = [];
  inventarioestatus: any = [];
  totalinventarios: any = [];
  totalusuarios: any = [];
  inventarios: any = [];
  coeficientegeneral : any = [];

  constructor
  (
    private auth: UserService,
    private inventarioService: InventarioService,
    private router: Router,
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

  }
  ngOnInit() {

    this.auth.profile().subscribe(
      res => {
        this.usuarios = res;
        console.log(res);
      },

      err => {
        alert('Sesion Experiada..')
        this.router.navigateByUrl('/login');

      }
    );

    this.EstadisticaCalcularEquiposInventariosEstatus();
    // this.TotalUsuarios();
    this.totalInventario();
    this.TablaGeneralInventarios();
    this.TablaCoeficienteGeneral();

  }




  TablaGeneralInventarios()
  {
    this.inventarioService.TablaEquiposInventariosGeneral().subscribe(res => {
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


  
  TablaCoeficienteGeneral()
  {
    this.inventarioService.TablaCoeficicienteGeneral().subscribe(res => {
      this.coeficientegeneral = res;
      console.log(res);
    },
    err => {
      console.log(err);
  
    }
   );
  }













  TotalUsuarios()
  {
    this.inventarioService.cantidadTotalUsuarios().subscribe(
      res => {
        this.totalusuarios = res;
        console.log('total usuarios:', res);
      });
  }

  totalInventario()
  {
    this.inventarioService.cantidadTotalInventario().subscribe(res => {
      this.totalinventarios = res;
      console.log('total inventario:', res);
    });
  }




  EstadisticaCalcularEquiposInventariosEstatus()
  {
    this.inventarioService.getContarInventarioEstatus().subscribe( res => {
      this.inventarioestatus = res;
      console.log(res);

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



  }







  logout(){
    this.auth.logout();
  }


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
   // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

}
