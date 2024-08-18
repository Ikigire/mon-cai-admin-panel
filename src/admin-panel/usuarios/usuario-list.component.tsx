import { Email, People, PeopleAltRounded } from "@mui/icons-material";
import { Box, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, FormControl, InputLabel, OutlinedInput, InputAdornment, DialogActions, Button, Slide } from "@mui/material";
import { useState, forwardRef } from "react";
import { alertar } from "../../constantes/constantes";
import { Usuario } from "../../models/Usuario.model"
import { TransitionProps } from "@mui/material/transitions";
import { deleteUsuario, updateUsuario } from "../services/usuario.service";
import { UsuarioCard } from "./usuario-card.component";


class UsuarioListProps {
    usuarios: Usuario[] = [];
    onListChange: Function = () => { }
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const UsuarioList = ({ usuarios, onListChange }: UsuarioListProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [usuarioToEdit, setUsuarioToEdit] = useState<Usuario>({ email: '', nombre: '', isAdmin: false })

    // RegExp para validar el EMAIL
    const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;


    const handleEdit = (usuario: Usuario) => {
        setOpenDialog(true);
        setUsuarioToEdit({ ...usuario });
    }

    const handleDelete = (idUsuario: number) => {
        deleteUsuario(idUsuario)
            .then(async (resp: Response) => {
                if (resp.status !== 200) {
                    const { error, message } = await resp.json();
                    alertar(error, message, 'warning');
                    return;
                }
                onListChange();
                alertar("Usuario elimimnado", `El Usuario ${idUsuario} fue eliminado`, 'success');
            })
            .catch((error: Error) => {
                alertar("Ups!", error.message, 'error');
            });
    }

    const handleNombreChange = (event: any) => {
        let { nativeEvent: { target: { value } } } = event;

        value = value as string;

        const newusuario = { ...usuarioToEdit };
        newusuario.nombre = value;
        setUsuarioToEdit(newusuario);
    };

    const handleEmailChange = (event: any) => {
        let { nativeEvent: { target: { value } } } = event;

        value = value as string;

        const newusuario = { ...usuarioToEdit };
        newusuario.email = value;
        setUsuarioToEdit(newusuario);
    };

    const handleDialogGuardar = () => {
        setOpenDialog(false);
        const updateuser = { ...usuarioToEdit };

        updateUsuario({ ...updateuser })
            .then(async (resp: Response) => {
                console.log(resp);
                
                if (resp.status !== 200) {
                    const { error, message } = await resp.json();
                    alertar(error, message, 'warning');
                    return;
                }
                alertar("Acutalizado", `El Usuario ${updateuser.nombre} se acutalizo correctamente`, 'success');
                onListChange();
            })
            .catch((error: Error) => {
                alertar("Ups! Algo salió mal", error.message, 'error');
            });
    }

    return (
        <Box component={'section'}>
            {/* <Typography variant="h4">Sensores</Typography> */}
            <Grid container spacing={1} justifyContent={'center'} alignItems={'center'} direction={'row'}>
                {
                    usuarios.map(usuario => {

                        return (
                            <Grid item key={usuario.idUsuario} xs={12} md={6} lg={4} xl={3}>
                                <UsuarioCard usuario={usuario}
                                    onEdit={() => handleEdit(usuario)}
                                    onDelete={() => handleDelete(usuario.idUsuario!)}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>

            {/* DIALOG para editar sensore */}
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpenDialog(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Editando el sensor</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant='body1' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >Edite los datos y guarde por favor</Typography>
                    </DialogContentText>

                    <Grid container spacing={2} gap={1} flex={'Grid'} alignItems={'center'} justifyContent={'center'}>
                        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <People />
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" >
                                <InputLabel>Nombre del Usuario</InputLabel>
                                <OutlinedInput
                                    type="text"
                                    label="Nombre del Usuario"
                                    value={usuarioToEdit.nombre}
                                    onChange={handleNombreChange}
                                    color={usuarioToEdit.nombre.length > 2 ? "primary" : "error"}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PeopleAltRounded />
                                        </InputAdornment>
                                    }
                                />
                                {usuarioToEdit.nombre.length > 2 ? <></> :
                                    <Typography color={'error'}>El Nombre debe contener al menos 3 caracteres</Typography>
                                }
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* <TextField label="Contraseña" type="password" value={user.password}

                        /> */}
                            <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" >
                                <InputLabel>Correo Electrónico</InputLabel>
                                <OutlinedInput
                                    type={"email"}
                                    label="Correo Electrónico"
                                    value={usuarioToEdit.email}
                                    onChange={handleEmailChange}
                                    color={usuarioToEdit.email.length > 0 ? "primary" : "error"}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    }
                                />
                                {emailRegex.test(usuarioToEdit.email) ? <></> :
                                    <Typography color={'error'}>Ingrese un correo válido por favor</Typography>
                                }
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='secondary' onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button variant='contained'
                        disabled={!(usuarioToEdit.nombre.length > 2) || !(emailRegex.test(usuarioToEdit.email))}
                        onClick={handleDialogGuardar}
                    >
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}