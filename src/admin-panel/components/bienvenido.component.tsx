import { Container, Typography } from '@mui/material';
import { useAppContext } from "../../app.context"

export const Bienvenida = () => {
    const { usuario } = useAppContext();

    return (
        <Container >
            <Typography variant='h3'>Bienvenido {usuario?.nombre}</Typography>
            
        </Container>
    );
}