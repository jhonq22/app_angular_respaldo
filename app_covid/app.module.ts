import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioAdminComponent } from './components/admin/inicio-admin/inicio-admin.component';
import { VacunasAdminListComponent } from './components/admin/vacunas/vacunas-admin-list/vacunas-admin-list.component';
import { VacunasAdminFormComponent } from './components/admin/vacunas/vacunas-admin-form/vacunas-admin-form.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { MenuAdminComponent } from './components/templates/menu/menu-admin/menu-admin.component';
import { SidebarComponent } from './components/templates/sidebar/sidebar.component';
import { UsuariosAdminFormComponent } from './components/admin/usuarios/usuarios-admin-form/usuarios-admin-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './components/login/login.component';
import { UsuariosAdminListComponent } from './components/admin/usuarios/usuarios-admin-list/usuarios-admin-list.component';
import { DatePipe } from '@angular/common';
import { CentroSaludAdminFormComponent } from './components/admin/centrosalud/centro-salud-admin-form/centro-salud-admin-form.component';
import { CentroSaludAdminListComponent } from './components/admin/centrosalud/centro-salud-admin-list/centro-salud-admin-list.component';
import { ReportesGeneralAdminComponent } from './components/admin/reportes/reportes-general-admin/reportes-general-admin.component';
import { TipoVacunasAdminListComponent } from './components/admin/tipovacunas/tipo-vacunas-admin-list/tipo-vacunas-admin-list.component';
import { TipoVacunasAdminFormComponent } from './components/admin/tipovacunas/tipo-vacunas-admin-form/tipo-vacunas-admin-form.component';
import { QRListPublicComponent } from './components/publico/qrlist-public/qrlist-public.component';
import { VacunasPerdidasAdminListComponent } from './admin/components/vacunas/vacunas-perdidas-admin-list/vacunas-perdidas-admin-list.component';
import { VacunasPerdidasAdminFormComponent } from './admin/components/vacunas/vacunas-perdidas-admin-form/vacunas-perdidas-admin-form.component';
import { MenuGeneralComponent } from './components/templates/menu/menu-general/menu-general.component';
import { MenuRegistradorComponent } from './components/templates/menu/menu-registrador/menu-registrador.component';
import { ReporteGeneralComponent } from './components/templates/reportes/reporte-general/reporte-general.component';
import { MenuVisorComponent } from './components/templates/menu/menu-visor/menu-visor.component';
import { VacunadosEstadalGeneraListComponent } from './components/estadal/vacunados-estadal-genera-list/vacunados-estadal-genera-list.component';
import { MenuRegistradorEstadalComponent } from './components/templates/menu/estadal/menu-registrador-estadal/menu-registrador-estadal.component';
import { MenuVisorEstadalComponent } from './components/templates/menu/estadal/menu-visor-estadal/menu-visor-estadal.component';
import { VacunadosEstadalGeneralFormComponent } from './components/estadal/vacunados-estadal-general-form/vacunados-estadal-general-form.component';
import { ReportesCentroSaludRegistradorComponent } from './components/registrador/reportes/reportes-centro-salud-registrador/reportes-centro-salud-registrador.component';
import { ReportesNacionalGeneralComponent } from './components/nacional/reportes/reportes-nacional-general/reportes-nacional-general.component';
import { MenuNacionalComponent } from './components/templates/menu/menu-nacional/menu-nacional.component';
import { UsuariosConfiguracionListComponent } from './components/configuracion/usuarios/usuarios-configuracion-list/usuarios-configuracion-list.component';
import { UsuariosConfiguracionFormComponent } from './components/configuracion/usuarios/usuarios-configuracion-form/usuarios-configuracion-form.component';
import { MenuConfiguracionComponent } from './components/templates/menu/menu-configuracion/menu-configuracion.component';
import { VacunasPerdidasRegistradorListComponent } from './components/estadal/vacunas-perdidas-registrador-list/vacunas-perdidas-registrador-list.component';
import { VisorEstadalVacunasListComponent } from './components/visores/visor-estadal/visor-estadal-vacunas-list/visor-estadal-vacunas-list.component';
import { MenuVestadalComponent } from './components/admin/menu/menu-vestadal/menu-vestadal.component';
import { VisorEstadalVacunasPerdidasComponent } from './components/visores/visor-estadal/visor-estadal-vacunas-perdidas/visor-estadal-vacunas-perdidas.component';
import { VisorEstadalReportesEstadalComponent } from './components/visores/visor-estadal/visor-estadal-reportes-estadal/visor-estadal-reportes-estadal.component';
import { GrupoEspecialesAdminFormComponent } from './components/admin/grupo-especiales-admin-form/grupo-especiales-admin-form.component';
import { GrupoEspecialesAdminListComponent } from './components/admin/grupo-especiales-admin-list/grupo-especiales-admin-list.component';
import { ActualizarPasswordGeneralFormComponent } from './components/configuracion/actualizar-password-general-form/actualizar-password-general-form.component';
import { VacunadosListQRCompletaComponent } from './components/admin/vacunados/vacunados-list-qrcompleta/vacunados-list-qrcompleta.component';
import { DataSaludReporteAdminComponent } from './components/admin/vacunados/reportes/data-salud-reporte-admin/data-salud-reporte-admin.component';
import { CertificadoReporteVacunasComponent } from './components/admin/certificado-reporte-vacunas/certificado-reporte-vacunas.component';
import { VacunasRecibidasFormAdminComponent } from './components/admin/vacunas/vacunas-recibidas/vacunas-recibidas-form-admin/vacunas-recibidas-form-admin.component';
import { VacunasRecibidasListAdminComponent } from './components/admin/vacunas/vacunas-recibidas/vacunas-recibidas-list-admin/vacunas-recibidas-list-admin.component';
import { VacunasRecibidasEstadalListComponent } from './components/estadal/vacunas-recibidas/vacunas-recibidas-estadal-list/vacunas-recibidas-estadal-list.component';
import { VacunasRecibidasEstadalFormComponent } from './components/estadal/vacunas-recibidas/vacunas-recibidas-estadal-form/vacunas-recibidas-estadal-form.component';
import { VacunasRecibidasRegistradorFormComponent } from './components/registrador/vacunas-recibidas/vacunas-recibidas-registrador-form/vacunas-recibidas-registrador-form.component';
import { VacunasRecibidasRegistradorListComponent } from './components/registrador/vacunas-recibidas/vacunas-recibidas-registrador-list/vacunas-recibidas-registrador-list.component';
import { MenuRecepcionComponent } from './components/templates/menu/recepcion/menu-recepcion/menu-recepcion.component';
import { ImportarVacunadosAdminFormComponent } from './components/admin/vacunados/importar/importar-vacunados-admin-form/importar-vacunados-admin-form.component';
import { ImportarVacunadosAdminListComponent } from './components/admin/vacunados/importar/importar-vacunados-admin-list/importar-vacunados-admin-list.component';
import { ImportarVacunadosAdminEditComponent } from './components/admin/vacunados/importar/importar-vacunados-admin-edit/importar-vacunados-admin-edit.component';
import { VacunadosMasterPatriaAdminFormComponent } from './components/admin/vacunados-master-patria-admin-form/vacunados-master-patria-admin-form.component';
import { RegistradorMasterComponent } from './components/templates/menu/registradorMaster/registrador-master/registrador-master.component';
import { MenuCargaMasivaComponent } from './components/templates/menu/menu-carga-masiva/menu-carga-masiva.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioAdminComponent,
    VacunasAdminListComponent,
    VacunasAdminFormComponent,
    MenuAdminComponent,
    SidebarComponent,
    UsuariosAdminFormComponent,
    LoginComponent,
    UsuariosAdminListComponent,
    CentroSaludAdminFormComponent,
    CentroSaludAdminListComponent,
    ReportesGeneralAdminComponent,
    TipoVacunasAdminListComponent,
    TipoVacunasAdminFormComponent,
    QRListPublicComponent,
    VacunasPerdidasAdminListComponent,
    VacunasPerdidasAdminFormComponent,
    MenuGeneralComponent,
    MenuRegistradorComponent,
    ReporteGeneralComponent,
    MenuVisorComponent,
    VacunadosEstadalGeneraListComponent,
    MenuRegistradorEstadalComponent,
    MenuVisorEstadalComponent,
    VacunadosEstadalGeneralFormComponent,
    ReportesCentroSaludRegistradorComponent,
    ReportesNacionalGeneralComponent,
    MenuNacionalComponent,
    UsuariosConfiguracionListComponent,
    UsuariosConfiguracionFormComponent,
    MenuConfiguracionComponent,
    VacunasPerdidasRegistradorListComponent,
    VisorEstadalVacunasListComponent,
    MenuVestadalComponent,
    VisorEstadalVacunasPerdidasComponent,
    VisorEstadalReportesEstadalComponent,
    GrupoEspecialesAdminFormComponent,
    GrupoEspecialesAdminListComponent,
    ActualizarPasswordGeneralFormComponent,
    VacunadosListQRCompletaComponent,
    DataSaludReporteAdminComponent,
    CertificadoReporteVacunasComponent,
    VacunasRecibidasFormAdminComponent,
    VacunasRecibidasListAdminComponent,
    VacunasRecibidasEstadalListComponent,
    VacunasRecibidasEstadalFormComponent,
    VacunasRecibidasRegistradorFormComponent,
    VacunasRecibidasRegistradorListComponent,
    MenuRecepcionComponent,
    ImportarVacunadosAdminFormComponent,
    ImportarVacunadosAdminListComponent,
    ImportarVacunadosAdminEditComponent,
    VacunadosMasterPatriaAdminFormComponent,
    RegistradorMasterComponent,
    MenuCargaMasivaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
