import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VacunasPerdidasAdminFormComponent } from './admin/components/vacunas/vacunas-perdidas-admin-form/vacunas-perdidas-admin-form.component';
import { VacunasPerdidasAdminListComponent } from './admin/components/vacunas/vacunas-perdidas-admin-list/vacunas-perdidas-admin-list.component';
import { CentroSaludAdminFormComponent } from './components/admin/centrosalud/centro-salud-admin-form/centro-salud-admin-form.component';
import { CentroSaludAdminListComponent } from './components/admin/centrosalud/centro-salud-admin-list/centro-salud-admin-list.component';
import { CertificadoReporteVacunasComponent } from './components/admin/certificado-reporte-vacunas/certificado-reporte-vacunas.component';
import { GrupoEspecialesAdminFormComponent } from './components/admin/grupo-especiales-admin-form/grupo-especiales-admin-form.component';
import { GrupoEspecialesAdminListComponent } from './components/admin/grupo-especiales-admin-list/grupo-especiales-admin-list.component';
import { InicioAdminComponent } from './components/admin/inicio-admin/inicio-admin.component';
import { TipoVacunasAdminFormComponent } from './components/admin/tipovacunas/tipo-vacunas-admin-form/tipo-vacunas-admin-form.component';
import { TipoVacunasAdminListComponent } from './components/admin/tipovacunas/tipo-vacunas-admin-list/tipo-vacunas-admin-list.component';
import { UsuariosAdminFormComponent } from './components/admin/usuarios/usuarios-admin-form/usuarios-admin-form.component';
import { UsuariosAdminListComponent } from './components/admin/usuarios/usuarios-admin-list/usuarios-admin-list.component';
import { VacunadosMasterPatriaAdminFormComponent } from './components/admin/vacunados-master-patria-admin-form/vacunados-master-patria-admin-form.component';
import { ImportarVacunadosAdminEditComponent } from './components/admin/vacunados/importar/importar-vacunados-admin-edit/importar-vacunados-admin-edit.component';
import { ImportarVacunadosAdminFormComponent } from './components/admin/vacunados/importar/importar-vacunados-admin-form/importar-vacunados-admin-form.component';
import { ImportarVacunadosAdminListComponent } from './components/admin/vacunados/importar/importar-vacunados-admin-list/importar-vacunados-admin-list.component';
import { VacunadosListQRCompletaComponent } from './components/admin/vacunados/vacunados-list-qrcompleta/vacunados-list-qrcompleta.component';
import { VacunasAdminFormComponent } from './components/admin/vacunas/vacunas-admin-form/vacunas-admin-form.component';
import { VacunasAdminListComponent } from './components/admin/vacunas/vacunas-admin-list/vacunas-admin-list.component';
import { VacunasRecibidasFormAdminComponent } from './components/admin/vacunas/vacunas-recibidas/vacunas-recibidas-form-admin/vacunas-recibidas-form-admin.component';
import { VacunasRecibidasListAdminComponent } from './components/admin/vacunas/vacunas-recibidas/vacunas-recibidas-list-admin/vacunas-recibidas-list-admin.component';
import { ActualizarPasswordGeneralFormComponent } from './components/configuracion/actualizar-password-general-form/actualizar-password-general-form.component';
import { UsuariosConfiguracionFormComponent } from './components/configuracion/usuarios/usuarios-configuracion-form/usuarios-configuracion-form.component';
import { UsuariosConfiguracionListComponent } from './components/configuracion/usuarios/usuarios-configuracion-list/usuarios-configuracion-list.component';
import { VacunadosEstadalGeneraListComponent } from './components/estadal/vacunados-estadal-genera-list/vacunados-estadal-genera-list.component';
import { VacunadosEstadalGeneralFormComponent } from './components/estadal/vacunados-estadal-general-form/vacunados-estadal-general-form.component';
import { VacunasPerdidasRegistradorListComponent } from './components/estadal/vacunas-perdidas-registrador-list/vacunas-perdidas-registrador-list.component';
import { VacunasRecibidasEstadalFormComponent } from './components/estadal/vacunas-recibidas/vacunas-recibidas-estadal-form/vacunas-recibidas-estadal-form.component';
import { VacunasRecibidasEstadalListComponent } from './components/estadal/vacunas-recibidas/vacunas-recibidas-estadal-list/vacunas-recibidas-estadal-list.component';
import { LoginComponent } from './components/login/login.component';
import { ReportesNacionalGeneralComponent } from './components/nacional/reportes/reportes-nacional-general/reportes-nacional-general.component';
import { QRListPublicComponent } from './components/publico/qrlist-public/qrlist-public.component';
import { ReportesCentroSaludRegistradorComponent } from './components/registrador/reportes/reportes-centro-salud-registrador/reportes-centro-salud-registrador.component';
import { VacunasRecibidasRegistradorFormComponent } from './components/registrador/vacunas-recibidas/vacunas-recibidas-registrador-form/vacunas-recibidas-registrador-form.component';
import { VacunasRecibidasRegistradorListComponent } from './components/registrador/vacunas-recibidas/vacunas-recibidas-registrador-list/vacunas-recibidas-registrador-list.component';
import { ReporteGeneralComponent } from './components/templates/reportes/reporte-general/reporte-general.component';
import { VisorEstadalReportesEstadalComponent } from './components/visores/visor-estadal/visor-estadal-reportes-estadal/visor-estadal-reportes-estadal.component';
import { VisorEstadalVacunasListComponent } from './components/visores/visor-estadal/visor-estadal-vacunas-list/visor-estadal-vacunas-list.component';
import { VisorEstadalVacunasPerdidasComponent } from './components/visores/visor-estadal/visor-estadal-vacunas-perdidas/visor-estadal-vacunas-perdidas.component';

const routes: Routes = [
  { path: 'inicio', component:  InicioAdminComponent },

  { path: 'login', component:  LoginComponent },

  { path: 'certificado', component:  CertificadoReporteVacunasComponent },



//Vacunados

{ path: 'vacunados/admin/list', component:  VacunasAdminListComponent },
{ path: 'vacunados/admin/form', component:  VacunasAdminFormComponent },
{ path: 'vacunados/admin/edit/:id', component:  VacunasAdminFormComponent },

// IMPORTAR EXCEL //
{ path: 'vacunados/importar/admin/form', component:  ImportarVacunadosAdminFormComponent },
{ path: 'vacunados/importar/admin/list', component:  ImportarVacunadosAdminListComponent },
{ path: 'vacunados/importar/admin/edit/:id', component:  ImportarVacunadosAdminEditComponent },







{ path: 'vacunados/admin/list/completa/qr', component:  VacunadosListQRCompletaComponent },

{ path: 'qr/vacunados/:cedula', component:  QRListPublicComponent },

//REPORTES VACUNAS //

{ path: 'vacunados/reportes/general/list', component:  ReporteGeneralComponent },



// VACUNAS PERDIDAS //

{ path: 'vacunas_perdidas/admin/list', component:  VacunasPerdidasAdminListComponent },
{ path: 'vacunas_perdidas/admin/form', component:  VacunasPerdidasAdminFormComponent },
{ path: 'vacunas_perdidas/admin/edit/:id', component:  VacunasPerdidasAdminFormComponent },

{ path: 'vacunas_perdidas/registrador/list/:id', component:  VacunasPerdidasRegistradorListComponent },




// VACUNAS RECIBIDAS ADMIN //

{ path: 'vacunas_recibidas/admin/list', component:  VacunasRecibidasListAdminComponent },
{ path: 'vacunas_recibidas/admin/form', component:  VacunasRecibidasFormAdminComponent },
{ path: 'vacunas_recibidas/admin/edit/:id', component:  VacunasRecibidasFormAdminComponent },


// VACUNAS RECIBIDAS ESTADAL //

{ path: 'vacunas_recibidas/estadal/list', component:  VacunasRecibidasEstadalListComponent },
{ path: 'vacunas_recibidas/estadal/form', component:  VacunasRecibidasEstadalFormComponent },
{ path: 'vacunas_recibidas/estadal/edit/:id', component:  VacunasRecibidasEstadalFormComponent },


// VACUNAS RECIBIDAS CENTRO SALUD //

{ path: 'vacunas_recibidas/registrador/list', component:  VacunasRecibidasRegistradorListComponent },
{ path: 'vacunas_recibidas/registrador/form', component:  VacunasRecibidasRegistradorFormComponent },
{ path: 'vacunas_recibidas/registrador/edit/:id', component:  VacunasRecibidasRegistradorFormComponent },




// CENTRO DE SALUD //

{ path: 'centrosalud/admin/list', component:  CentroSaludAdminListComponent },
{ path: 'centrosalud/admin/form', component:  CentroSaludAdminFormComponent },
{ path: 'centrosalud/admin/edit/:id', component:  CentroSaludAdminFormComponent },


  //TIPOS DE VACUNAS

  
  { path: 'tiposvacunas/admin/list', component:  TipoVacunasAdminListComponent },
  { path: 'tiposvacunas/admin/form', component:  TipoVacunasAdminFormComponent },
  { path: 'tiposvacunas/admin/edit/:id', component:  TipoVacunasAdminFormComponent },


  //CRUD DE GRUPO ESPECIALES //

  { path: 'grupo_especial/admin/list', component:  GrupoEspecialesAdminListComponent },
  { path: 'grupo_especial/admin/form', component:  GrupoEspecialesAdminFormComponent },
  { path: 'grupo_especial/admin/edit/:id', component:  GrupoEspecialesAdminFormComponent },







//ROL REGISTRADOR //

{ path: 'vacunas/centro_salud/list/:id', component:  VacunadosEstadalGeneraListComponent },
{ path: 'vacunas/centro_salud/form', component:  VacunadosEstadalGeneralFormComponent },
{ path: 'vacunas/centro_salud/edit/:id', component:  VacunadosEstadalGeneralFormComponent },



{ path: 'vacunados/master/patria/form', component:  VacunadosMasterPatriaAdminFormComponent },
{ path: 'vacunados/master/patria/edit/:id', component:  VacunadosMasterPatriaAdminFormComponent },


// REPORTES CENTRO SALUD REGISTRADOR
{ path: 'vacunados/reportes/centro_salud/list/:id', component:  ReportesCentroSaludRegistradorComponent },











// --------------- ROL VISORES ESTADAL --------------- ///




{ path: 'vacunas/visores/estadal/list/:id', component:  VisorEstadalVacunasListComponent },
{ path: 'vacunas_perdidas/visores/estadal/list/:id', component:  VisorEstadalVacunasPerdidasComponent },
{ path: 'vacunados/reportes/estadal/list/:id', component:  VisorEstadalReportesEstadalComponent },


















// ROL NACIONAL PARA EL MINISTRO //


{ path: 'vacunas/nacional/reportes', component:  ReportesNacionalGeneralComponent },
  

  //USUARIOS

  
    { path: 'usuarios/admin/list', component:  UsuariosAdminListComponent },
    { path: 'usuarios/admin/form', component:  UsuariosAdminFormComponent },
    { path: 'usuarios/admin/edit/:id', component:  UsuariosAdminFormComponent },
    { path: 'usuarios/admin/actualizar/password/:id', component:  ActualizarPasswordGeneralFormComponent },



    { path: 'usuarios/configuracion/list', component:  UsuariosConfiguracionListComponent },
    { path: 'usuarios/configuracion/form', component:  UsuariosConfiguracionFormComponent },
    { path: 'usuarios/configuracion/edit/:id', component:  UsuariosConfiguracionFormComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
