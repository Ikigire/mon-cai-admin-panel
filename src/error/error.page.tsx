import { Button, Box, Container } from '@mui/material'
import './error.page.css'

export const ErrorPage = () => {
  return (
    <Container>
        <Box>
            <img src='/public/404.svg' />
            <Button>Regresar al Inicio</Button>
        </Box>
    </Container>
  )
}
