import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { TabPanel } from "../components/tab-panel.component";
import { SyntheticEvent, useEffect, useState } from "react";
import { Dispositivo } from '../../models/Dispositivo.model';
import { getAllDispositivos } from "../services/dispositivo.service";
import { alertar } from "../../constantes/constantes";
import { DispositivoList } from "./dispositivo-list.component";
import { AgregarDispositivo } from "./agregar-dispositivo.component";

export const DispositivosPage = () => {
    const [updateList, setUpdateList] = useState(false);
    const [dispositivos, setDispositivos] = useState<Dispositivo[]>([]);
    const [activeTab, setActiveTab] = useState(0);

    const getSensores = () => {
        getAllDispositivos()
            .then(async (resp: Response) => {
                if (resp.status !== 200) {
                    const { error, message } = await resp.json();
                    alertar(error, message, 'warning');
                    return;
                }
                setDispositivos(await resp.json());
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
            <Typography variant="h2">Dispositivos</Typography>
            <Divider />
            <Box component={'div'} >
                <Tabs  value={activeTab} onChange={handleTabChange}>
                    <Tab label='Agregar Dispositivos' id="tab-0" aria-controls="tabpanel-0" />
                    <Tab label='Lista de Dispositivos' id="tab-1" aria-controls="tabpanel-1" />
                </Tabs>
            </Box>
            <Divider />
            <TabPanel activeTab={activeTab} index={0} >
                <AgregarDispositivo onSubmit={onSensorListUpdate} />
            </TabPanel>
            <TabPanel activeTab={activeTab} index={1}>
                <DispositivoList dispositivos={dispositivos} onListChange={onSensorListUpdate} />
            </TabPanel>
        </>
    );
}