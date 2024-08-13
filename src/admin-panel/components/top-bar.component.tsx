import { Logout, MenuRounded } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Typography, Tooltip } from "@mui/material";
import { useAppContext } from "../../app.context";
import { useNavigate } from "react-router-dom";


// class TopBarProps {
//     handleMenu: Function = () => {};
// }


export const TopBar = () => {
    const { setSession, setOpenMenu } = useAppContext();
    const navigate = useNavigate();

    const logoutClick = () => {
        setSession!({ idUsuario: -1, nombre: '', email: '' });
        navigate('/')
    }

    const openMenu = () => {
        setOpenMenu && setOpenMenu(true);
    }

    return (
        <AppBar color="primary">
            <Toolbar color="primary">
                <IconButton size="large" edge='start' aria-label="menu" onClick={openMenu}>
                    <MenuRounded />
                </IconButton>

                <Typography variant="h5" component={'div'} sx={{ flexGrow: 1 }}>
                    Bienvenido al Admin Panel
                </Typography>
                <div>
                    <Tooltip title="Cerrar sesión">
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={logoutClick}
                            color="inherit"
                        >
                            <Logout />
                        </IconButton>

                    </Tooltip>
                </div>
            </Toolbar>
        </AppBar>
    );
}