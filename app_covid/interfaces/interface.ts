 // export let API_URI = 'http://190.202.84.194/vacunaserver/public/api';
   export let API_URI = 'https://apimpps.farmapatria.com.ve/api';
  // export let API_URI = 'http://127.0.0.1:8000/api';
  
   
  //QR
   //export let QR_URI = 'http://127.0.0.1:4200';
   export let QR_URI = 'https://vacunasmpps.farmapatria.com.ve';

 

export interface VacunasInterfaces {
    id?: number;
    tipo_identificacion?: number;
    cedula?: string;
    nombres?: string;
    apellidos?: string;
    sexo?: string; 
    fecha_nacimiento?: string;
    telefono?: string;
    estado_id?: number;
    municipio_id?: number;
    parroquia_id?: number;
    centro_salud_id?: number;
    direccion?: string;
    email?: string;
    dosis1?: string;
    fecha_dosis1?: string;
    dosis2?: string;
    fecha_dosis2?: string;
    estatu_equipo_id?: number;
    tipo_vacuna_id?: number;
    imagen_qr?: string;
    lote1?: string;
    lote2?:string;
    establecimiento_laboral?: string;
    pueblo_indigena_id?: number;
    etnia_id?: number;
    grupo_especial_id?: number;
    user_id?: number;
    motivo_desercion?: string;
    
    
 }


 export interface VacunasPerdidasInterfaces {
    id?: number;
    tipo_vacuna_id?: number;
    numero_lote?: string;
    fecha_vencimiento?: string;
    numero_dosis_perdidas?: number;
    user_id?:number;
    causa_perdida?: string;
  
 }




 export interface CentroSaludInterface {
    id?: number;
    centro_salud?: string;
    tipo?: string;
    estado_id?: number;
    municipio_id?: number;
    direccion?: string;
    contacto_tlf?: string;
    contacto_email?: string;
    codigo_sicm?: string;
}



 export interface EstadosInterface {
    id?: number;
    estado?: string;
}


export interface TiposVacunasInterfaces {
    id?: number;
    nombre_vacuna?: string;
    estatus?: string;
}


export interface MunicipiosInterface {
    id?: number;
    municipio?: string;
    estado_id?: number;
}


export interface GrupoEspecialInterface {
    id?: number;
    grupo_especial?: string;
    codigo_grupo_especial?: number;
}


export interface VacunasRecibidasInterface {
    id?: number;
    tipo_vacuna_id?: number;
    numero_lote?: string;
    fecha_vencimiento?: string;
    grupo_especial?: string;
    componentes?: string;
    user_id?: number;
    cantidad?: string;
    estado_id?: number;
    municipio_id?: number;
    centro_salud_id?: number;
    cantidad_recibida?: string;
    observacion?: string;
    grupo_especial_id?: number;


}



export interface ConvocadosPatriasInterfaces {
    id?: number;
    tipo_identificacion?: string;
    cedula?: string;
    nombres?: string;
    fecha_nacimiento?: string;
    edad?: string;
    telefono?: string;
    direccion?: string;
    estado_id?: number;
    municipio_id?: number;
    centro_salud_id?: number;
    grupo_especial_id?: number;
    user_id?: number;
    estatu_convocado_id?: number;


}