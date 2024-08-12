import { Sensor } from "./Sensor.model";

export interface Dispositivo {
    idDispositivo: string;
    
    modelo: string;

    alias?: string;

    ubicacion?: string;

    icon?: string;

    sensores: Sensor[]
}