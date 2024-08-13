import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemAvatar, ListItemText, OutlinedInput, Slide, Typography } from '@mui/material';
import { Sensor } from '../../models/Sensor.model';
import { Delete, Edit, Sensors, Straighten } from "@mui/icons-material";
import { Fragment } from "react/jsx-runtime";
import { deleteSensor, updateSensor } from '../services/sensor.service';
import { alertar } from '../../constantes/constantes';
import { forwardRef, useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';

class SensorListProps {
    sensores: Sensor[] = [];
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

export const SensorList = ({ sensores, onListChange }: SensorListProps) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [sensorToEdit, setSensorToEdit] = useState<Sensor>({ tipo: '', umdd: '' })

    const handleEdit = (sensor: Sensor) => {
        setOpenDialog(true);
        setSensorToEdit({ ...sensor });
    }

    const handleDelete = (tipo: string) => {
        deleteSensor(tipo)
            .then(async (resp: Response) => {
                if (resp.status !== 200) {
                    const { error, message } = await resp.json();
                    alertar(error, message, 'warning');
                    return;
                }
                onListChange();
                alertar("Sensor elimimnado", `El sensor tipo ${tipo} fue eliminado`, 'success');
            })
            .catch((error: Error) => {
                alertar("Ups!", error.message, 'error');
            });
    }

    const handleTipoChange = (event: any) => {
        let { nativeEvent: { target: { value } } } = event;

        value = value as string;

        const newsensor = { ...sensorToEdit };
        newsensor.tipo = value;
        setSensorToEdit(newsensor);
    };

    const handleUMDDChange = (event: any) => {
        let { nativeEvent: { target: { value } } } = event;

        value = value as string;

        const newsensor = { ...sensorToEdit };
        newsensor.umdd = value;
        setSensorToEdit(newsensor);
    };

    const handleDialogGuardar = () => {
        setOpenDialog(false);

        updateSensor({ ...sensorToEdit })
            .then(async (resp: Response) => {
                if (resp.status !== 200) {
                    const { error, message } = await resp.json();
                    alertar(error, message, 'warning');
                    return;
                }

                alertar("Éxito", `El Sensor de tipo ${sensorToEdit.tipo} se actualizó`, 'success')
                onListChange();
            })
            .catch((error: Error) => {
                alertar("Ups! Algo salió mal", error.message, 'error');
            });
    }

    return (
        <Box component={'section'}>
            <Typography variant="h4">Sensores</Typography>
            <List>
                {
                    sensores.map(sensor => {

                        return (
                            <ListItem key={sensor.tipo} alignItems="flex-start"
                                secondaryAction={
                                    <>
                                        <IconButton edge='start' aria-label='Edit sensor'
                                            color='primary'
                                            onClick={() => handleEdit(sensor)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton edge='end' aria-label='Delete sensor'
                                            color='error'
                                            onClick={() => handleDelete(sensor.tipo)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemAvatar >
                                    <Sensors />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`Tipo sensor: ${sensor.tipo}`}
                                    secondary={
                                        <Fragment>
                                            <Typography sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                UMDD: {sensor.umdd}
                                            </Typography>
                                        </Fragment>
                                    }
                                />
                                <Divider variant='inset' component={'li'} />
                            </ListItem>
                        )
                    })
                }
            </List>

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

                    <Grid container >
                        <Grid item xs={12}>
                            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" >
                                <InputLabel>Tipo sensor</InputLabel>
                                <OutlinedInput
                                    type="text"
                                    label="Tipo sensor"
                                    value={sensorToEdit.tipo}
                                    onChange={handleTipoChange}
                                    color={sensorToEdit.tipo.length > 0 ? "primary" : "error"}
                                    readOnly
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Sensors />
                                        </InputAdornment>
                                    }
                                />
                                {sensorToEdit.tipo.length > 0 ? <></> :
                                    <Typography>El tipo debe contener al menos 1 caracter</Typography>
                                }
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" >
                                <InputLabel>UMDD</InputLabel>
                                <OutlinedInput
                                    type={"text"}
                                    label="UMDD"
                                    value={sensorToEdit.umdd}
                                    onChange={handleUMDDChange}
                                    color={sensorToEdit.umdd.length > 0 ? "primary" : "error"}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Straighten />
                                        </InputAdornment>
                                    }
                                />
                                {sensorToEdit.umdd.length > 0 ? <></> :
                                    <Typography>La UMDD debe tener por lo menos 1 caracter</Typography>
                                }
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='secondary' onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button variant='contained'
                        disabled={!(sensorToEdit.tipo.length > 0) || !(sensorToEdit.umdd.length > 0)}
                        onClick={handleDialogGuardar}
                    >
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}