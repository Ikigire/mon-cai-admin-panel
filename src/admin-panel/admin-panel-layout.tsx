import { Link, Outlet } from "react-router-dom";
import { useAppContext } from "../app.context";
import { Alert, Box, Button, Container, Dialog } from "@mui/material";
import { TopBar } from "./components/top-bar.component";
import { MenuLateral } from "./components/menu-lateral.component";

export const AdminPanel = () => {
    const { usuario } = useAppContext();
    
    

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
                <TopBar />
                {/* <MenuLateral open={open} onCLose={toggleDrawer} /> */}
                <MenuLateral />
                <Box component={'main'} sx={{marginTop: 8}}>
                    <Outlet />
                </Box>
            </Box>
        </Container>
    );
}