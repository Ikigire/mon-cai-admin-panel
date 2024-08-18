import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { Usuario } from "../../models/Usuario.model";
import { TabPanel } from "../components/tab-panel.component";
import { AgregarUsuario } from "./agregar-usuario.component";
import { UsuarioList } from "./usuario-list.component";
import { getAllUsuarios } from "../services/usuario.service";
import { alertar } from "../../constantes/constantes";

export const UsuariosPage = () => {
    const [updateList, setUpdateList] = useState(false);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [activeTab, setActiveTab] = useState(0);

    const getUsuarios = () => {
        getAllUsuarios()
            .then(async resp => {
                if (resp.status !== 200) {
                    const { error, message } = await resp.json();
                    alertar(error, message, 'warning');
                    return;
                }

                setUsuarios(await resp.json());
            })
            .catch((error: Error) => {
                alertar("Ops!", error.message, 'error');
            });

    }

    const onUsuarioListUpdate = () => {
        setUpdateList(true);
    }

    /* Efectos de la página */
    // Efecto para cuando se carga la página
    useEffect(() => {
        getUsuarios();
    }, [])

    // Efecto para actualizar la lista de sensores cuando se añade uno nuevo
    useEffect(() => {
        if (!updateList)
            return

        getUsuarios();
        setUpdateList(false);
    }, [updateList])

    // Handlers
    const handleTabChange = (_event: SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    }

    return (
        <>
            <Typography variant="h2">Usuarios</Typography>
            <Divider />
            <Box component={'div'} >
                <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab label='Agregar Usuario' id="tab-0" aria-controls="tabpanel-0" />
                    <Tab label='Lista de Usuarios' id="tab-1" aria-controls="tabpanel-1" />
                </Tabs>
            </Box>
            <Divider />
            <TabPanel activeTab={activeTab} index={0} >
                <AgregarUsuario onSubmit={onUsuarioListUpdate} />
            </TabPanel>
            <TabPanel activeTab={activeTab} index={1}>
                <UsuarioList usuarios={usuarios} onListChange={onUsuarioListUpdate} />
            </TabPanel>
        </>
    );
}