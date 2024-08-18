import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Slide, Typography } from '@mui/material';
import { Sensors, Straighten } from "@mui/icons-material";
import { alertar } from '../../constantes/constantes';
import { forwardRef, useEffect, useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { Dispositivo } from '../../models/Dispositivo.model';
import { deleteDispositivo, updateDispositivo } from '../services/dispositivo.service';
import { DispositivoCard } from './dispositivo-card.component';
import { Sensor } from '../../models/Sensor.model';
import { SelectSensorList } from './select-sensor-list.component';
import { getAllSensores } from '../services/sensor.service';



class DispositivoListProps {
    dispositivos: Dispositivo[] = [{idDispositivo: 'asdasdasdasd', modelo: 'mamalón', sensores: [{tipo: 'a', umdd: 'A vergazos'}]}];
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

export const DispositivoList = ({ dispositivos, onListChange }: DispositivoListProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [dispositivoToEdit, setDispositivoToEdit] = useState<Dispositivo>({ idDispositivo: '', modelo: '', sensores: [] })
    const [selectedSensores, setSelectedSensores] = useState<Sensor[]>([]);
    const [sensores, setSensores] = useState<Sensor[]>([]);

    
    const handleEdit = (dispositivo: Dispositivo) => {
        setOpenDialog(true);
        setDispositivoToEdit({ ...dispositivo });        
    }

    const handleDelete = (idDispositivo: string) => {
        deleteDispositivo(idDispositivo)
            .then(async (resp: Response) => {
                if (resp.status !== 200) {
                    const { error, message } = await resp.json();
                    alertar(error, message, 'warning');
                    return;
                }
                onListChange();
                alertar("Sensor elimimnado", `El Dispositivo ${idDispositivo} fue eliminado`, 'success');
            })
            .catch((error: Error) => {
                alertar("Ups!", error.message, 'error');
            });
    }

    const handleIdChange = (event: any) => {
        let { nativeEvent: { target: { value } } } = event;

        value = value as string;

        const newDev = { ...dispositivoToEdit };
        newDev.idDispositivo = value;
        setDispositivoToEdit(newDev);
    };

    const handleUMDDChange = (event: any) => {
        let { nativeEvent: { target: { value } } } = event;

        value = value as string;

        const newDev = { ...dispositivoToEdit };
        newDev.modelo = value;
        setDispositivoToEdit(newDev);
    };

    const handleDialogGuardar = () => {
        setOpenDialog(false);
        const device = {...dispositivoToEdit};

        device.sensores = [...selectedSensores];
        console.log(device)
        updateDispositivo({ ...device })
            .then(async (resp: Response) => {
                if (resp.status !== 200) {
                    const { error, message } = await resp.json();
                    alertar(error, message, 'warning');
                    return;
                }
                alertar("Acutalizado", `El dispositivo ${device.idDispositivo} se acutalizo correctamente`, 'success');
                onListChange();
            })
            .catch((error: Error) => {
                alertar("Ups! Algo salió mal", error.message, 'error');
            });
    }

    useEffect(() =>{
        getAllSensores()
        .then(async resp => {
            setSensores(await resp.json());
        })
        .catch();
    }, [])

    return (
        <Box component={'section'}>
            {/* <Typography variant="h4">Sensores</Typography> */}
            <Grid container spacing={1} justifyContent={'center'} alignItems={'center'} direction={'row'}>
                {
                    dispositivos.map(dispositivo => {

                        return (
                            <Grid item key={dispositivo.idDispositivo} xs={12} md={6} lg={4} xl={3}>
                                <DispositivoCard 
                                    dispositivo={dispositivo} onEdit={() => handleEdit(dispositivo)} 
                                    onDelete={() => handleDelete(dispositivo.idDispositivo)} 
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
                        <Typography variant='body1'>Edite los datos y guarde por favor</Typography>
                    </DialogContentText>

                    <Grid container flex={'Grid'} alignItems={'center'} justifyContent={'center'} >
                        <Grid item xs={12}>
                            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" >
                                <InputLabel>Tipo sensor</InputLabel>
                                <OutlinedInput
                                    type="text"
                                    label="Tipo sensor"
                                    value={dispositivoToEdit.idDispositivo}
                                    onChange={handleIdChange}
                                    color={dispositivoToEdit.idDispositivo.length > 0 ? "primary" : "error"}
                                    readOnly
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Sensors />
                                        </InputAdornment>
                                    }
                                />
                                {dispositivoToEdit.idDispositivo.length > 10 ? <></> :
                                    <Typography>El Id de Dispositivo debe contener al menos 10 caracteres</Typography>
                                }
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" >
                                <InputLabel>UMDD</InputLabel>
                                <OutlinedInput
                                    type={"text"}
                                    label="UMDD"
                                    value={dispositivoToEdit.modelo}
                                    onChange={handleUMDDChange}
                                    color={dispositivoToEdit.modelo.length > 0 ? "primary" : "error"}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Straighten />
                                        </InputAdornment>
                                    }
                                />
                                {dispositivoToEdit.modelo.length > 0 ? <></> :
                                    <Typography>La Modelo debe tener por lo menos 1 caracter</Typography>
                                }
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                <SelectSensorList sensores={sensores} setSelectedSesorList={setSelectedSensores} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='secondary' onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button variant='contained'
                        disabled={!(dispositivoToEdit.idDispositivo.length > 10) || !(dispositivoToEdit.modelo.length > 0)}
                        onClick={handleDialogGuardar}
                    >
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}