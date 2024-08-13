import { base_url, headers } from '../../constantes/constantes';
import { Dispositivo } from '../../models/Dispositivo.model';

const url = `${base_url}dispositivo`;

export const createDispositivo = (dispositivo: Dispositivo) => {
    delete dispositivo.alias;
    delete dispositivo.icon;
    delete dispositivo.ubicacion;

    return fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(dispositivo)
    });
}

export const getAllDispositivos = () => {
    return fetch(url);
}

export const getDispositivoById = (tipo: string) => {
    return fetch(`${url}/${tipo}`);
}

export const updateDispositivo = (dispositivo: Dispositivo) => {
    return fetch(`${url}/${dispositivo.idDispositivo}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(dispositivo) 
    });
}

export const deleteDispositivo = (idDispositivo: string) => {
    return fetch(`${url}/${idDispositivo}`, {
        method: 'DELETE'
    });
} 