import { useEffect, useState } from "react";
import { Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { Aod, Devices, OnDeviceTraining } from "@mui/icons-material";
import { alertar } from "../../constantes/constantes";
import { Dispositivo } from '../../models/Dispositivo.model';
import { createDispositivo } from "../services/dispositivo.service";
import { SelectSensorList } from "./select-sensor-list.component";
import { Sensor } from "../../models/Sensor.model";
import { getAllSensores } from "../services/sensor.service";


class AgregarProps {
    onSubmit: Function = () => { }
}

export const AgregarDispositivo = ({ onSubmit }: AgregarProps) => {
    const [dispositivo, setDispositivo] = useState<Dispositivo>({ idDispositivo: '', modelo: '', sensores: [] });
    const [selectedSensores, setSelectedSensores] = useState<Sensor[]>([]);
    const [sensores, setSensores] = useState<Sensor[]>([]);

    let idState: undefined | boolean = undefined;
    let modState: undefined | boolean = undefined;

    const handleIdChange = (event: any) => {
        let { nativeEvent: { target: { value } } } = event;

        value = value as string;

        const newsensor = { ...dispositivo };
        newsensor.idDispositivo = value;
        setDispositivo(newsensor);
    };

    const handleModeloChange = (event: any) => {
        let { nativeEvent: { target: { value } } } = event;

        value = value as string;

        const newsensor = { ...dispositivo };
        newsensor.modelo = value;
        setDispositivo(newsensor);
    };

    idState = dispositivo.idDispositivo.length > 10;
    modState = dispositivo.modelo.length > 0;

    const handleAgregarClick = () => {
        const device = {...dispositivo};
        device.sensores = [...selectedSensores];
        createDispositivo(device)
            .then(async resp => {
                if (resp.status !== 201) {
                    const { error, message } = await resp.json();
                    alertar(error, message, 'warning');
                    return;
                }

                alertar("Éxito!", `El sensor tipo ${dispositivo.idDispositivo} fur registrado`, 'success');

                // Resetenado el componente
                setDispositivo({ idDispositivo: '', modelo: dispositivo.modelo, sensores: [] });
                idState = undefined;
                modState = undefined;

                onSubmit();
            })
            .catch((error: Error) => {
                alertar("Ups! Algo salió mal", error.message, 'error');
            });
    };

    useEffect(() =>{
        getAllSensores()
        .then(async resp => {
            setSensores(await resp.json());
        })
        .catch();
    }, [])

    return (
        <>
            <Typography variant="h4">Registrar nuevo Dispositivo</Typography>
            <Grid container spacing={2} gap={1}>
                <Grid item xs={12}>
                    <Devices />
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" >
                        <InputLabel>Id de Dispositivo</InputLabel>
                        <OutlinedInput
                            type="text"
                            label="Id de Dispositivo"
                            value={dispositivo.idDispositivo}
                            onChange={handleIdChange}
                            color={dispositivo.idDispositivo.length > 10 ? "primary" : "error"}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Aod />
                                </InputAdornment>
                            }
                        />
                        {dispositivo.idDispositivo.length > 10 ? <></> :
                            <Typography color={'error'}>El ID debe contener al menos 10 caracteres</Typography>
                        }
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    {/* <TextField label="Contraseña" type="password" value={user.password}

                        /> */}
                    <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined" >
                        <InputLabel>Modelo:</InputLabel>
                        <OutlinedInput
                            type={"text"}
                            label="Modelo:"
                            value={dispositivo.modelo}
                            onChange={handleModeloChange}
                            color={dispositivo.modelo.length > 0 ? "primary" : "error"}
                            startAdornment={
                                <InputAdornment position="start">
                                    <OnDeviceTraining />
                                </InputAdornment>
                            }
                        />
                        {dispositivo.modelo.length > 0 ? <></> :
                            <Typography color={'error'}>La Modelo debe tener por lo menos 1 caracter</Typography>
                        }
                    </FormControl>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    {selectedSensores.length ? <></>: <Typography color={'error'}>Por favor seleccione al menos un Sensor</Typography>}
                    <SelectSensorList sensores={sensores} setSelectedSesorList={setSelectedSensores} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleAgregarClick} disabled={!(dispositivo.idDispositivo.length > 10) || !(dispositivo.modelo.length > 0) || !selectedSensores.length}>Registrar</Button>
                </Grid>
            </Grid>
        </>
    );
}