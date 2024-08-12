import { Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";
import { Devices, Home, People, Sensors } from "@mui/icons-material";
import { useAppContext } from "../../app.context";
import { useNavigate } from "react-router-dom";

// class MenuProps {
//     open: boolean = false;
//     onCLose?: Function
// }

const DrawerList = () => {

    const navigate = useNavigate();

    const navigateTo = (path: string) => {
        navigate(path);
    }

    return (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigateTo("/admin-panel/welcome")}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigateTo("/admin-panel/sensores")}>
                        <ListItemIcon>
                            <Sensors />
                        </ListItemIcon>
                        <ListItemText primary={'Sensores'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigateTo("/admin-panel/dispositivos")}>
                        <ListItemIcon>
                            <Devices />
                        </ListItemIcon>
                        <ListItemText primary={'Dispositivos'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigateTo("/admin-panel/usuarios")}>
                        <ListItemIcon>
                            <People />
                        </ListItemIcon>
                        <ListItemText primary={'Usuarios'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
};

export const MenuLateral = () => {
    const { openMenu, setOpenMenu } = useAppContext();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenMenu && setOpenMenu(newOpen);
    };
    return (
        <Drawer
            open={openMenu}
            onClose={toggleDrawer(false)}
        >
            <DrawerList />
        </Drawer>
    );
}