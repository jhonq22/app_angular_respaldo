import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/template/inicio/inicio.component';
import { UsuarioListComponent } from './components/usuarios/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { LoginComponent } from './components/template/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { InventarioListAdminComponent } from './components/admin/inventario/inventario-list-admin/inventario-list-admin.component';
import { InventarioFormAdminComponent } from './components/admin/inventario/inventario-form-admin/inventario-form-admin.component';
import { InventarioMultimediaFormComponent } from './components/admin/inventario/inventario-multimedia-form/inventario-multimedia-form.component';
import { InventarioHistoricoComponent } from './components/admin/inventario/inventario-historico/inventario-historico.component';
import { UsuarioFotoComponent } from './components/usuarios/usuario-foto/usuario-foto.component';
import { CentrosaludListAdminComponent } from './components/admin/centrosalud/centrosalud-list-admin/centrosalud-list-admin.component';
import { CentrosaludFormAdminComponent } from './components/admin/centrosalud/centrosalud-form-admin/centrosalud-form-admin.component';
import { InventarioListEstadalComponent } from './components/estadal/inventarios/inventario-list-estadal/inventario-list-estadal.component';
import { InventarioListCentroSaludUnicoComponent } from './components/admin/inventarios/inventario-list-centro-salud-unico/inventario-list-centro-salud-unico.component';
import { InventarioEstadisticaCentroSaludUnicoComponent } from './components/admin/inventarios/inventario-estadistica-centro-salud-unico/inventario-estadistica-centro-salud-unico.component';
import { HomeComponent } from './components/template/home/home.component';
import { ImportExcelInventarioComponent } from './components/admin/inventario/import-excel-inventario/import-excel-inventario.component';
import { ReporteGeneralInventarioAdminComponent } from './components/admin/inventario/reportes/reporte-general-inventario-admin/reporte-general-inventario-admin.component';
import { MarcaListAdminComponent } from './components/admin/marcas/marca-list-admin/marca-list-admin.component';
import { MarcaFormAdminComponent } from './components/admin/marcas/marca-form-admin/marca-form-admin.component';
import { EquipoListAdminComponent } from './components/admin/equipos/equipo-list-admin/equipo-list-admin.component';
import { EquipoFormAdminComponent } from './components/admin/equipos/equipo-form-admin/equipo-form-admin.component';
import { HistoricoInventarioComponent } from './components/admin/inventario/historico-inventario/historico-inventario.component';
import { EquipoRespuestoAdminListComponent } from './components/admin/inventario/equipo-respuesto-admin-list/equipo-respuesto-admin-list.component';
import { EquipoRespuestoAdminFormComponent } from './components/admin/inventario/equipo-respuesto-admin-form/equipo-respuesto-admin-form.component';
import { DetallesRepuestosPedidosComponent } from './components/admin/repuestos/detalles-repuestos-pedidos/detalles-repuestos-pedidos.component';
import { InventarioEquiposNoOperativosComponent } from './components/admin/inventario/inventario-equipos-no-operativos/inventario-equipos-no-operativos.component';
import { SolicitadosListGeneralComponent } from './components/admin/repuestos/solicitados-list-general/solicitados-list-general.component';
import { SolicitadosDetallesListEquipoComponent } from './components/admin/repuestos/solicitados-detalles-list-equipo/solicitados-detalles-list-equipo.component';
import { EstadalinventariosNoOperativosComponent } from './components/estadal/estadalinventarios-no-operativos/estadalinventarios-no-operativos.component';
import { ReportesEstadalInventarioComponent } from './components/estadal/inventarios/reportes-estadal-inventario/reportes-estadal-inventario.component';
import { InventarioListEstadalMunicipioComponent } from './components/estadal/inventarios/inventario-list-estadal-municipio/inventario-list-estadal-municipio.component';
import { InventarioListEstadalEstadosComponent } from './components/estadal/inventarios/inventario-list-estadal-estados/inventario-list-estadal-estados.component';
import { ListCentroSaludEstadosComponent } from './components/estadal/centroSalud/list-centro-salud-estados/list-centro-salud-estados.component';
import { CambiarContrasenaEstadalComponent } from './components/estadal/usuarios/cambiar-contrasena-estadal/cambiar-contrasena-estadal.component';
import { BibliotecaVirtualAdminListComponent } from './components/admin/biblioteca/biblioteca-virtual-admin-list/biblioteca-virtual-admin-list.component';
import { BibliotecaVirtualAdminFormComponent } from './components/admin/biblioteca/biblioteca-virtual-admin-form/biblioteca-virtual-admin-form.component';
import { ReportesRepuestoDetallesAdminComponent } from './components/admin/detallesRepuestos/reportes-repuesto-detalles-admin/reportes-repuesto-detalles-admin.component';
import { DetallesRepuestosActualizarComponent } from './components/admin/detallesRepuestos/detalles-repuestos-actualizar/detalles-repuestos-actualizar.component';
import { TecnicosAdminListComponent } from './components/admin/tecnicos/tecnicos-admin-list/tecnicos-admin-list.component';
import { TecnicosAdminFormComponent } from './components/admin/tecnicos/tecnicos-admin-form/tecnicos-admin-form.component';


const routes: Routes = [

  { path: 'inicio', component:  HomeComponent },
  { path: 'inicio/admin', component:  InicioComponent },
  { path: 'inicio/estadal', component:  InicioComponent },
  { path: 'login', component:  LoginComponent },

  // ROL DE ADMIN //
  { path: 'usuario/list', component:  UsuarioListComponent },
  { path: 'usuario/form', component:  UsuarioFormComponent },
  { path: 'usuario/edit/:id', component:  UsuarioFormComponent },
  { path: 'usuario/foto/:id', component:  UsuarioFotoComponent },

  // INVENTARIO
  { path: 'inventario/admin/list', component:  InventarioListAdminComponent },
  { path: 'inventario/admin/form', component:  InventarioFormAdminComponent },
  { path: 'inventario/admin/edit/:id', component:  InventarioFormAdminComponent },
  { path: 'inventario/general/centrosalud/:id', component:  InventarioListCentroSaludUnicoComponent },
  { path: 'inventario/general/estadistica/centrosalud', component:  InventarioEstadisticaCentroSaludUnicoComponent },
  { path: 'inventario/admin/nooperativos', component:  InventarioEquiposNoOperativosComponent },

  // INVENTARIO Multimedia
  { path: 'inventario/admin/multimedia/:id', component:  InventarioMultimediaFormComponent },
  { path: 'inventario/admin/historico/:id', component:  InventarioHistoricoComponent },


    // CENTRO SALUD
    { path: 'centrosalud/admin/list', component:  CentrosaludListAdminComponent },
    { path: 'centrosalud/admin/form', component:  CentrosaludFormAdminComponent },
    { path: 'centrosalud/admin/edit/:id', component:  CentrosaludFormAdminComponent },


    // MARCAS
    { path: 'marcas/admin/list', component:  MarcaListAdminComponent },
    { path: 'marcas/admin/form', component:  MarcaFormAdminComponent },
    { path: 'marcas/admin/edit/:id', component:  MarcaFormAdminComponent },


    
    // Tecnicos
    { path: 'tecnicos/admin/list', component:  TecnicosAdminListComponent },
    { path: 'tecnicos/admin/form', component:  TecnicosAdminFormComponent },
    { path: 'tecnicos/admin/edit/:id', component:  TecnicosAdminFormComponent },

    

     // EQUIPOS
     { path: 'equipos/admin/list', component:  EquipoListAdminComponent },
     { path: 'equipos/admin/form', component:  EquipoFormAdminComponent },
     { path: 'equipos/admin/edit/:id', component:  EquipoFormAdminComponent },


      // MARCAS
    { path: 'respuestos/admin/list', component:  EquipoRespuestoAdminListComponent },
    { path: 'respuestos/admin/form', component:  EquipoRespuestoAdminFormComponent },
    { path: 'respuestos/admin/edit/:id', component:  EquipoRespuestoAdminFormComponent },



    // BIBLIOTECA VIRTUAL
    { path: 'biblioteca/admin/list', component:  BibliotecaVirtualAdminListComponent },
    { path: 'biblioteca/admin/form', component:  BibliotecaVirtualAdminFormComponent },
    { path: 'biblioteca/admin/edit/:id', component:  BibliotecaVirtualAdminFormComponent },






//detalles REPUESTOS

{ path: 'respuestos/detalles/asignar/:id', component:  DetallesRepuestosPedidosComponent },
{ path: 'repuestos/solicitados', component:  SolicitadosListGeneralComponent },
{ path: 'repuestos/solicitados/detalles/:id', component:  SolicitadosDetallesListEquipoComponent },
{ path: 'repuestos/solicitados/reportes', component:  ReportesRepuestoDetallesAdminComponent },
{ path: 'repuestos/solicitados/actualizar/:id', component:  DetallesRepuestosActualizarComponent },




    { path: 'inventario/admin/excel-import', component:  ImportExcelInventarioComponent },
  
    { path: 'inventario/reportes/admin/general', component:  ReporteGeneralInventarioAdminComponent },

    
    //HISTORICO INVENTARIO //
    { path: 'historico/admin/list', component:  HistoricoInventarioComponent },

    // AQUI TERMINA ROL DE ADMIN //


    // ROL DE ESTADAL //
    { path: 'estadal/buscar/inventario/form', component:  InventarioListEstadalComponent },
    { path: 'inventario/estadal/nooperativos', component:  EstadalinventariosNoOperativosComponent },
    { path: 'reportes/estadal/general', component:  ReportesEstadalInventarioComponent },


    { path: 'inventario/estadal/estados/:id', component:  InventarioListEstadalEstadosComponent },
    { path: 'inventario/estadal/municipios/:id', component:  InventarioListEstadalMunicipioComponent },

    { path: 'usuarios/estadal/contrasena/:id', component:  CambiarContrasenaEstadalComponent },
    { path: 'centrosalud/estadal/list/:id', component:  ListCentroSaludEstadosComponent },



  { path: '**', pathMatch: 'full', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
