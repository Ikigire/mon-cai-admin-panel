import { base_url, headers } from "../../constantes/constantes";
import { Usuario } from '../../models/Usuario.model';

const url = `${base_url}usuario`;

export const createUsuario = (usuario: Usuario) => {
    delete usuario.idUsuario;
    delete usuario.isAdmin;
    return fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(usuario)
    });
}

export const getAllUsuarios = () => {
    return fetch(url);
}

export const getUsuarioById = (idUsuario: number) => {
    return fetch(`${url}/${idUsuario}`);
}

export const makeOrRemoveAdmin = (requester: number, newAdmin: number) => {
    return fetch(`${url}/${newAdmin}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({requester, newAdmin})
    });
}

export const updateUsuario = (usuario: Usuario) => {
    delete usuario.isAdmin; 
    delete usuario.password;
    console.log(usuario);
    return fetch(`${url}/${usuario.idUsuario}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(usuario) 
    });
}

export const deleteUsuario = (idUsuario: number) => {
    return fetch(`${url}/${idUsuario}`, {
        method: 'DELETE'
    });
} 