import { Box, Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { useAppContext } from "../app.context";
import { useState } from "react";
import { Login } from "../models/Login.model";
import { AccountBox, Key, Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "./login.service";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Usuario } from "../models/Usuario.model";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const { setSession } = useAppContext();
    const [user, setUser] = useState<Login>({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [emailState, setEmailState] = useState<boolean>();
    const [passState, setPassState] = useState<boolean>();

    // Objeto para la navegación
    let navigate = useNavigate();

    // Objeto de notificationes
    const alerta = withReactContent(Swal);

    // Manejadores del correo y la constraseña
    const handleEmailChange = (event: any) => { 
        const {nativeEvent: {target: {value}}} = event;
        const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        const logindata = {...user};
        
        logindata.email = (value as string) ?? '';

        setUser(logindata);

        if (emailRegex.test(value)) {
            setEmailState(true);
        } else {
            setEmailState(false);
        }
    };
    const handlePasswordChange = (event: any) => { 
        const {nativeEvent: {target: {value}}} = event; 

        const logindata = {...user};
        
        logindata.password = (value as string) ?? '';

        setUser(logindata);

        if ((value as string).length > 5) {
            setPassState(true);
        } else {
            setPassState(false);
        }
    };

    const alertar= (title: string, text: string, icon: 'warning'| 'error' | 'success', timer = 3000, didClose = () => {}) => {
        alerta.fire({
            timer,
            toast: true,
            position: 'center',
            showConfirmButton: false,
            title,
            text,
            icon,
            didClose
        });
    }

    const handleIngresarClick = () => { 
        login(user)
        .then(async resp => {
            if (resp.status !== 201) {
                const {error, message} = await resp.json();
                
                alertar(error, message, 'warning');
                return;
            }
            
            const usuario: Usuario = await resp.json();

            if (!usuario.isAdmin) {
                alertar("No puede acceder", `El usuario ${usuario.nombre} no es un administrador`, 'warning');
                return;
            }
            
            setSession!(usuario);
            alertar("Hola", `Bienvenido ${usuario.nombre}`, 'success', 800, () => {navigate('/admin-panel/welcome')});
        })
        .catch((error) => {            
            alertar(`Ups! Algo salió mal`, error.message, 'error');
        }
        );
    };

    return (
        <Container>
            <Box component={'form'} >
                <Grid container spacing={2} gap={1}>
                    <Grid item xs={12}>
                        <img src="/logo.png" alt="Logo" width='250px' />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" >
                            <InputLabel>Correo Electrónico</InputLabel>
                            <OutlinedInput
                                type="email"
                                label="Correo Electrónico"
                                value={user.email}
                                onChange={handleEmailChange}
                                color={emailState || emailState == undefined ? "primary" : "error"}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountBox />
                                    </InputAdornment>
                                }
                            />
                            {emailState || emailState == undefined ? <></> :
                                <Typography>Por favor ingrese un correo electrónico</Typography>
                            }
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        {/* <TextField label="Contraseña" type="password" value={user.password}

                        /> */}
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" >
                            <InputLabel>Contraseña</InputLabel>
                            <OutlinedInput
                                type={showPassword ? "text" : "password"}
                                label="Contraseña"
                                value={user.password}
                                onChange={handlePasswordChange}
                                color={passState || passState == undefined ? "primary" : "error"}
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
                            {passState || passState == undefined ? <></> :
                                <Typography>la contraseña debe tener por lo menos 6 caractéres</Typography>
                            }
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleIngresarClick} disabled={!passState || !emailState}>Ingresar</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}