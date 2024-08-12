import { useState } from "react";
import { AccountCircle, MenuRounded } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import { useAppContext } from "../../app.context";


class TopBarProps {
    handleMenu: Function = () => {};
}


export const TopBar = (pr: TopBarProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {setOpenMenu} = useAppContext();

    const openMenu = () => {
        setOpenMenu && setOpenMenu(true);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    
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
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() =>{}}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}