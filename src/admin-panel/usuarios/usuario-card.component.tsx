import { Avatar, Card, CardActions, CardContent, CardHeader, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { Usuario } from "../../models/Usuario.model";
import { Edit, Delete, Key, KeyOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getUsuarioById, makeOrRemoveAdmin } from "../services/usuario.service";
import { useAppContext } from "../../app.context";
import { alertar } from "../../constantes/constantes";


class UsuarioCardProps {
    onDelete: Function = () => { };
    onEdit: Function = () => { };
    usuario: Usuario = { email: '', nombre: '' };
}

export const UsuarioCard = ({ usuario, onDelete, onEdit }: UsuarioCardProps) => {
    const [user, setUser] = useState<Usuario>(usuario);
    const { usuario: userLogged } = useAppContext();

    const handleAdminAction = () => {
        makeOrRemoveAdmin(userLogged?.idUsuario!, user.idUsuario!)
        .then(async resp => {
            const json = await resp.json();

            setUser({...json});
        })
        .catch((error: Error) => {
            alertar("Ops!", error.message, 'error');
        });
    }

    useEffect(() => {
        getUsuarioById(usuario.idUsuario!)
            .then(async resp => {
                const json = await resp.json();

                setUser({ ...json });
            })
            .catch();
    }, []);

    return (
        <Card sx={{ maxWidth: 345, border: user.isAdmin ? 2 : 0, borderColor: 'text.primary' }} >
            <CardHeader
                avatar={
                    <Avatar aria-label="Device">
                        {usuario.nombre.charAt(0).toLocaleUpperCase()}
                        {/* <VerifiedUser /> */}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" color="primary" onClick={() => onEdit()}>
                        <Edit />
                    </IconButton>
                }
                title={`ID: ${usuario.idUsuario}`}
                subheader={`Email: ${usuario.email}`}
            />
            <CardContent component={'div'} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column' }}>
                <Typography variant="body2" >
                    Nombre: {usuario.nombre}
                </Typography>
                {/* {/* <Typography variant="body2" >
                    ° {dispositivo.ubicacion ? `Lo han colocado en: "${dispositivo.ubicacion}"` : 'Aun no ha sido colocado en algún sitio'}
                    </Typography>
                    <Divider /> */}
                {user.isAdmin &&
                    <>
                        <Divider />
                        <Typography variant="body2" >
                            Este Usuario es administrador
                        </Typography>
                    </>
                }
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="Delete" color="error" onClick={() => onDelete()} >
                    <Delete />
                </IconButton>
                <IconButton aria-label="add to favorites" edge='end' style={{marginLeft: 'auto'}} onClick={() => handleAdminAction()}>
                    {
                        user.isAdmin ?
                            <Tooltip 
                                title='Remover derechos de Aministrador'
                            >
                                <KeyOff />
                            </Tooltip>
                            :
                            <Tooltip title='Convertir en administrador'>
                                <Key />
                            </Tooltip>
                    }
                </IconButton>
            </CardActions>
        </Card>
    );
}