import { useState } from "react";
import { Usuario } from "../../models/Usuario.model";
import { alertar } from "../../constantes/constantes";
import { Button, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Switch, Typography } from "@mui/material";
import { Email, Key, KeyOff, People, PeopleAltRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import { createUsuario } from "../services/usuario.service";

class AgregarUsuarioProps {
    onSubmit: Function = () => { }
}

export const AgregarUsuario = ({ onSubmit }: AgregarUsuarioProps) => {
    const [usuario, setUsuario] = useState<Usuario>({ email: '', nombre: '', password: '', isAdmin: false });
    const [showPassword, setShowPassword] = useState(false);

    // RegExp para validar el EMAIL
    const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    const handleNombreChange = (event: any) => {
        let { nativeEvent: { target: { value } } } = event;

        value = value as string;

        const newusuario = { ...usuario };
        newusuario.nombre = value;
        setUsuario(newusuario);
    };

    const handleEmailChange = (event: any) => {
        let { nativeEvent: { target: { value } } } = event;

        value = value as string;

        const newusuario = { ...usuario };
        newusuario.email = value;
        setUsuario(newusuario);
    };

    const handlePasswordChange = (event: any) => {
        let { nativeEvent: { target: { value } } } = event;

        value = value as string;

        const newusuario = { ...usuario };
        newusuario.password = value;
        setUsuario(newusuario);
    };

    const toggleIsAdmin = () => {
        const newusuario = { ...usuario };
        newusuario.isAdmin = !usuario.isAdmin;

        setUsuario(newusuario);
    };

    const handleAgregarClick = () => {
        const user = { ...usuario };

        // Resetenado el componente
        setUsuario({ email: '', nombre: '', password: '', isAdmin: false });

        createUsuario(user)
            .then(async resp => {
                if (resp.status !== 201) {
                    const { error, message } = await resp.json();
                    alertar(error, message, 'warning');
                    setUsuario({...user});
                    return;
                }
                alertar("Éxito!", `El Usuario ${user.nombre} fur registrado`, 'success');


                onSubmit();
            })
            .catch((error: Error) => {
                alertar("Ups! Algo salió mal", error.message, 'error');
                setUsuario({...user});
            });
    };


    return (
        <>
            <Typography variant="h4">Registrar nuevo Usuario</Typography>
            <Grid container spacing={2} gap={1}>
                <Grid item xs={12}>
                    <People />
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" >
                        <InputLabel>Nombre del Usuario</InputLabel>
                        <OutlinedInput
                            type="text"
                            label="Nombre del Usuario"
                            value={usuario.nombre}
                            onChange={handleNombreChange}
                            color={usuario.nombre.length > 2 ? "primary" : "error"}
                            startAdornment={
                                <InputAdornment position="start">
                                    <PeopleAltRounded />
                                </InputAdornment>
                            }
                        />
                        {usuario.nombre.length > 2 ? <></> :
                            <Typography color={'error'}>El Nombre debe contener al menos 3 caracteres</Typography>
                        }
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    {/* <TextField label="Contraseña" type="password" value={user.password}

                        /> */}
                    <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" >
                        <InputLabel>Correo Electrónico</InputLabel>
                        <OutlinedInput
                            type={"email"}
                            label="Correo Electrónico"
                            value={usuario.email}
                            onChange={handleEmailChange}
                            color={usuario.email.length > 0 ? "primary" : "error"}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            }
                        />
                        {emailRegex.test(usuario.email) ? <></> :
                            <Typography color={'error'}>Ingrese un correo válido por favor</Typography>
                        }
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" >
                        <InputLabel>Contraseña</InputLabel>
                        <OutlinedInput
                            type={showPassword ? "text" : "password"}
                            label="Contraseña"
                            value={usuario.password}
                            onChange={handlePasswordChange}
                            color={usuario.password!.length > 5 ? "primary" : "error"}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Key />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toogle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end" >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {usuario.password!.length > 5 ? <></> :
                            <Typography color={'error'}>la contraseña debe tener por lo menos 6 caractéres</Typography>
                        }
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component={'fieldset'}>
                        {/* <FormLabel component={'legend'}>Otorgar derechos</FormLabel> */}
                        <FormGroup>
                            <FormControlLabel
                                // control={<Switch color="primary" value={usuario.isAdmin} onChange={toggleIsAdmin} />}
                                control={<Switch icon={<KeyOff />} checkedIcon={<Key />} value={'isAdmin'} checked={usuario.isAdmin} onChange={toggleIsAdmin} />}
                                label='¿Es Administrador?  '
                                labelPlacement="start"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleAgregarClick} disabled={!(usuario.nombre.length > 2) || !(emailRegex.test(usuario.email)) || !usuario.password!.length}>Registrar</Button>
                </Grid>
            </Grid>
        </>
    );
}