import { useState } from "react";
import { Sensor } from "../../models/Sensor.model";
import { Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { Sensors, Straighten } from "@mui/icons-material";
import { createSensor } from "../services/sensor.service";
import { alertar } from "../../constantes/constantes";


class AgregarProps {
    onSubmit: Function = () => {}
}

export const AgregarSensor = ({onSubmit}: AgregarProps) => {
    const [sensor, setSensor] = useState<Sensor>({tipo: '', umdd: ''});
    
    let tipoState: undefined | boolean = undefined;
    let umddState: undefined | boolean = undefined;
    
    const handleTipoChange = (event: any) => { 
        let {nativeEvent: {target: {value}}} = event;

        value = value as string;

        const newsensor = {...sensor};
        newsensor.tipo = value;
        setSensor(newsensor);
    };

    const handleUMDDChange = (event: any) => { 
        let {nativeEvent: {target: {value}}} = event;

        value = value as string;

        const newsensor = {...sensor};
        newsensor.umdd = value;
        setSensor(newsensor);
    };

    tipoState = sensor.tipo.length > 0;
    umddState = sensor.umdd.length > 0;

    const handleAgregarClick = () => {
        createSensor(sensor)
        .then(async resp => {
            if (resp.status !== 201) {
                const {error, message} = await resp.json();
                alertar(error, message, 'warning');
                return;
            }

            alertar("Éxito!", `El sensor tipo ${sensor.tipo} fur registrado`, 'success');

            // Resetenado el componente
            setSensor({tipo: '', umdd: ''});
            tipoState = undefined;
            umddState = undefined;
            
            onSubmit();
        })
        .catch((error: Error) => {
            alertar("Ups! Algo salió mal", error.message, 'error');
        });
    };

    return (
        <>
            <Typography variant="h4">Registrar nuevo tipo de sensor</Typography>
            <Grid container spacing={2} gap={1}>
                    <Grid item xs={12}>
                        <Sensors />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" >
                            <InputLabel>Tipo sensor</InputLabel>
                            <OutlinedInput
                                type="text"
                                label="Tipo sensor"
                                value={sensor.tipo}
                                onChange={handleTipoChange}
                                color={tipoState && tipoState == undefined ? "primary" : "error"}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Sensors />
                                    </InputAdornment>
                                }
                            />
                            {tipoState && tipoState == undefined ? <></> :
                                <Typography>El tipo debe contener al menos 1 caracter</Typography>
                            }
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        {/* <TextField label="Contraseña" type="password" value={user.password}

                        /> */}
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" >
                            <InputLabel>UMDD</InputLabel>
                            <OutlinedInput
                                type={"text"}
                                label="UMDD"
                                value={sensor.umdd}
                                onChange={handleUMDDChange}
                                color={umddState && umddState == undefined ? "primary" : "error"}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Straighten />
                                    </InputAdornment>
                                }
                            />
                            {umddState && umddState == undefined ? <></> :
                                <Typography>La UMDD debe tener por lo menos 1 caracter</Typography>
                            }
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={handleAgregarClick} disabled={!tipoState || !umddState}>Registrar</Button>
                    </Grid>
                </Grid>
        </>
    );
}