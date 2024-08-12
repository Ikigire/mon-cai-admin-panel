import { Link, Outlet } from "react-router-dom";
import { useAppContext } from "../app.context";
import { Alert, Box, Button, Container, Dialog, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material";
import { TopBar } from "./components/top-bar.component";
import { MenuLateral } from "./components/menu-lateral.component";
import { useState } from "react";
import { Inbox, Mail } from "@mui/icons-material";

export const AdminPanel = () => {
    const { usuario } = useAppContext();
    const { openMenu, setOpenMenu } = useAppContext();
    // const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenMenu && setOpenMenu(newOpen);
    };

    if (!usuario?.isAdmin) {
        return (
            <Container>
                <Box>
                    <Dialog open>
                        <Alert severity="error">Parece que usted no es un adminitrador, por favor inicie sessión de nuevo.</Alert>
                        <Button><Link to={'/'}>Volver al Login</Link></Button>
                    </Dialog>
                </Box>
            </Container>
        );
    }

    return (
        <Container>
            <Box>
                <TopBar handleMenu={toggleDrawer} />
                {/* <MenuLateral open={open} onCLose={toggleDrawer} /> */}
                <MenuLateral />
                <Box component={'main'} sx={{marginTop: 8}}>
                    <Outlet />
                </Box>
            </Box>
        </Container>
    );
}