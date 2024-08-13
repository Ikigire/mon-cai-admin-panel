import { base_url } from "../constantes/constantes";
import { Login } from "../models/Login.model";


const url: string = base_url + "usuario";

export const login = (user: Login): Promise<Response> => {
    return fetch(`${url}/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }
    );
}
