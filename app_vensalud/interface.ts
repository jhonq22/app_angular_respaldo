 //export let API_URI = 'http://190.202.84.194/server/public/api';
 //export let API_URI = 'http://localhost:8000/api';

 export let API_URI = 'https://backend.vensalud.gob.ve/api';
export interface InventarioInterfaces {
    id?: number;
    estado_id?: number;
    muncipio_id?: number;
    centro_salud_id?: number;
    servicio_medico?: string;
    piso?: string;
    equipo_id?: string;
    marca_id?: string;
    modelo?: string;
    serial?: string;
    numero_bien_nacional?: string;
    proveedor?: string;
    estatu_equipo_id?: number;
    observacion?: string;
    reparado?: string;
    fecha_instalacion?: string;
    proveedor_servicio?: string;
    user_id?: number;
}

export interface BibliotecaVirtualInterface {
    id?: number;
    tipo_bibloteca?: string;
    modelo?: string;
    observacion?: string;
    url_archivo?: string;
    descripcion?: string;
}


export interface HistoricoEstatusInterface {
    id?: number;
    inventario_id?: number;
    estatu_equipo_id?: number;
    observacion?: string;
}



export interface HistoricoInventarioInterface {
    id?: number;
    inventario_id?: number;
    user_id?: number;

}


export interface CentroSaludInterface {
    id?: number;
    centro_salud?: string;
    tipo?: string;
    estado_id?: number;
    municipio_id?: number;
    direccion?: string;
   // rif?: string;
    contacto_tlf?: string;
    contacto_email?: string;
}


export interface EstadosInterface {
    id?: number;
    estado?: string;
}


export interface MunicipiosInterface {
    id?: number;
    municipio?: string;
    estado_id?: number;
}


export interface MarcasInterfaces {
    id?: number;
    marca?: string;
}

export interface EquipoInterface {
    id?: number;
    equipo?: string;
}



export interface EquiposRespuestoInterface {
    id?: number;
    marca_id?: number;
    equipo_id?: number;
    nombre_repuesto?: string;
    existencia?: string;
    referencia?: string;
    descripcion?: string;

}



export interface RepuestoDetallesInterface {
    id?: number;
    inventario_id?: number;
    repuesto_id?: number;
    cantidad_pedido?: string;
    fecha_solicitud?: string;
    user_id?: string;
    estatu_solicitud_repuesto_id?: number;

}


export interface TecnicosInterface {
    id?: number;
    cedula?: string;
    nombres?: string;
    apellidos?: string;

}



