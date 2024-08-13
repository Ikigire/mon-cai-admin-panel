import { base_url, headers } from '../../constantes/constantes';
import { Sensor } from '../../models/Sensor.model';

const url = `${base_url}sensor`;

export const createSensor = (sensor: Sensor) => {
    return fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(sensor)
    });
}

export const getAllSensores = () => {
    return fetch(url);
}

export const getSensorByTipo = (tipo: string) => {
    return fetch(`${url}/${tipo}`);
}

export const updateSensor = (sensor: Sensor) => {
    return fetch(`${url}/${sensor.tipo}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(sensor) 
    });
}

export const deleteSensor = (tipo: string) => {
    return fetch(`${url}/${tipo}`, {
        method: 'DELETE'
    });
} 