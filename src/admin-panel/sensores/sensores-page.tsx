import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { AgregarSensor } from "./agregar.component";
import { SyntheticEvent, useEffect, useState } from "react";
import { Sensor } from "../../models/Sensor.model";
import { SensorList } from "./sensore-list.component";
import { getAllSensores } from "../services/sensor.service";
import { alertar } from "../../constantes/constantes";
import { TabPanel } from "../components/tab-panel.component";



export const SensoresPage = () => {
    const [updateList, setUpdateList] = useState(false);
    const [sensores, setSensores] = useState<Sensor[]>([]);
    const [activeTab, setActiveTab] = useState(0);

    const getSensores = () => {
        getAllSensores()
            .then(async (resp: Response) => {
                if (resp.status !== 200) {
                    const { error, message } = await resp.json();
                    alertar(error, message, 'warning');
                    return;
                }
                setSensores(await resp.json());
            })
            .catch((error: Error) => {
                alertar('Ups! algo salió mal', error.message, 'error');
            });
    }

    const onSensorListUpdate = () => {
        setUpdateList(true);
    }

    /* Efectos de la página */
    // Efecto para cuando se carga la página
    useEffect(() => {
        getSensores();
    }, [])

    // Efecto para actualizar la lista de sensores cuando se añade uno nuevo
    useEffect(() => {
        if (!updateList)
            return

        getSensores();
        setUpdateList(false);
    }, [updateList])

    // Handlers
    const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    }

    return (
        <>
            <Typography variant="h2">Sensores</Typography>
            <Divider />
            <Box component={'div'} >
                <Tabs  value={activeTab} onChange={handleTabChange}>
                    <Tab label='Agregar Sensor' id="tab-0" aria-controls="tabpanel-0" />
                    <Tab label='Lista de Sensores' id="tab-1" aria-controls="tabpanel-1" />
                </Tabs>
            </Box>
            <Divider />
            <TabPanel activeTab={activeTab} index={0} >
                <AgregarSensor onSubmit={onSensorListUpdate} />
            </TabPanel>
            <TabPanel activeTab={activeTab} index={1}>
                <SensorList sensores={sensores} onListChange={onSensorListUpdate} />
            </TabPanel>
        </>
    );
}