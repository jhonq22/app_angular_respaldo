import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
import { NgDatepickerModule } from 'ng2-datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


import { NgxGalleryModule } from 'ngx-gallery';

import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';
import { MatButtonModule,  MatToolbarModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts'; // fonts provided for pdfmake

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);






/* Custom Hammer configuration */
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    'pan': {
      direction: Hammer.DIRECTION_ALL,
    }
  };
}
/* End Custom hammer configuration */




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/template/sidebar/sidebar.component';
import { NavbarComponent } from './components/template/navbar/navbar.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { InicioComponent } from './components/template/inicio/inicio.component';
import { UsuarioListComponent } from './components/usuarios/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { FilterusuarioPipe } from './pipes/filterusuario.pipe';
import { LoginComponent } from './components/template/login/login.component';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { InventarioListAdminComponent } from './components/admin/inventario/inventario-list-admin/inventario-list-admin.component';
import { InventarioFormAdminComponent } from './components/admin/inventario/inventario-form-admin/inventario-form-admin.component';
import { FilterinventarioPipe } from './pipes/filterinventario.pipe';
import { InventarioMultimediaFormComponent } from './components/admin/inventario/inventario-multimedia-form/inventario-multimedia-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InventarioHistoricoComponent } from './components/admin/inventario/inventario-historico/inventario-historico.component';
import { UsuarioFotoComponent } from './components/usuarios/usuario-foto/usuario-foto.component';
import { CentrosaludFormAdminComponent } from './components/admin/centrosalud/centrosalud-form-admin/centrosalud-form-admin.component';
import { CentrosaludListAdminComponent } from './components/admin/centrosalud/centrosalud-list-admin/centrosalud-list-admin.component';
import { FiltercentrosaludPipe } from './pipes/filtercentrosalud.pipe';
import { MenuAdminComponent } from './components/template/menu/menu-admin/menu-admin.component';
import { MenuEstadalComponent } from './components/template/menu/menu-estadal/menu-estadal.component';
import { MenuLocalComponent } from './components/template/menu/menu-local/menu-local.component';
import { InventarioListEstadalComponent } from './components/estadal/inventarios/inventario-list-estadal/inventario-list-estadal.component';
import { InventarioListCentroSaludUnicoComponent } from './components/admin/inventarios/inventario-list-centro-salud-unico/inventario-list-centro-salud-unico.component';
import { InventarioEstadisticaCentroSaludUnicoComponent } from './components/admin/inventarios/inventario-estadistica-centro-salud-unico/inventario-estadistica-centro-salud-unico.component';
import { InicioEstadalComponent } from './components/estadal/inicio-estadal/inicio-estadal.component';
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
import { BibliotecaVirtualAdminFormComponent } from './components/admin/biblioteca/biblioteca-virtual-admin-form/biblioteca-virtual-admin-form.component';
import { BibliotecaVirtualAdminListComponent } from './components/admin/biblioteca/biblioteca-virtual-admin-list/biblioteca-virtual-admin-list.component';
import { ReportesRepuestoDetallesAdminComponent } from './components/admin/detallesRepuestos/reportes-repuesto-detalles-admin/reportes-repuesto-detalles-admin.component';
import { DetallesRepuestosActualizarComponent } from './components/admin/detallesRepuestos/detalles-repuestos-actualizar/detalles-repuestos-actualizar.component';
import { MenuTallerNacionalComponent } from './components/template/menu/menu-taller-nacional/menu-taller-nacional.component';
import { TecnicosAdminFormComponent } from './components/admin/tecnicos/tecnicos-admin-form/tecnicos-admin-form.component';
import { TecnicosAdminListComponent } from './components/admin/tecnicos/tecnicos-admin-list/tecnicos-admin-list.component';
import { MenuVisorGeneralComponent } from './components/admin/menu/menu-visor-general/menu-visor-general.component';



@NgModule({
  exports: [
    // Material
    MatButtonModule,
    MatToolbarModule,
  ],
  declarations: [InventarioHistoricoComponent, CentrosaludFormAdminComponent, CentrosaludListAdminComponent,   ]
})
export class MaterialModule { }



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    InicioComponent,
    UsuarioListComponent,
    UsuarioFormComponent,
    FilterusuarioPipe,
    LoginComponent,
    InventarioListAdminComponent,
    InventarioFormAdminComponent,
    FilterinventarioPipe,
    InventarioMultimediaFormComponent,
    InventarioHistoricoComponent,
    UsuarioFotoComponent,
    CentrosaludListAdminComponent,
    CentrosaludFormAdminComponent,
    FiltercentrosaludPipe,
    MenuAdminComponent,
    MenuEstadalComponent, 
    MenuLocalComponent,
    InventarioListEstadalComponent,
    InventarioListCentroSaludUnicoComponent,
    InventarioEstadisticaCentroSaludUnicoComponent,
    InicioEstadalComponent,
    HomeComponent,
    ImportExcelInventarioComponent,
    ReporteGeneralInventarioAdminComponent,
    MarcaListAdminComponent, 
    MarcaFormAdminComponent,
    EquipoListAdminComponent,
    EquipoFormAdminComponent,
    HistoricoInventarioComponent,
    EquipoRespuestoAdminListComponent,
    EquipoRespuestoAdminFormComponent,
    DetallesRepuestosPedidosComponent,
    InventarioEquiposNoOperativosComponent,
    SolicitadosListGeneralComponent,
    SolicitadosDetallesListEquipoComponent,
    EstadalinventariosNoOperativosComponent,
    ReportesEstadalInventarioComponent,
    InventarioListEstadalMunicipioComponent,
    InventarioListEstadalEstadosComponent,
    CambiarContrasenaEstadalComponent,
    ListCentroSaludEstadosComponent,
    BibliotecaVirtualAdminFormComponent,
    BibliotecaVirtualAdminListComponent,
    ReportesRepuestoDetallesAdminComponent,
    DetallesRepuestosActualizarComponent,
    MenuTallerNacionalComponent,
    TecnicosAdminFormComponent, 
    TecnicosAdminListComponent,
    MenuVisorGeneralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ChartsModule,
    NgxGalleryModule,
    NgDatepickerModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    AutocompleteLibModule
  ],
  providers: [
    UserService,
    {provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
