import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#6fbf73',
            main: '#4caf50',
            dark: '#357a38',
            contrastText: '#fff',
        },
        secondary: {
            light: '#637bfe',
            main: '#3d5afe',
            dark: '#2a3eb1',
            contrastText: '#000',
        },
        // background: {
        //     default: '#d1d1d1',
        //     paper: '#e6e6e6'
        // }
    }
})

export default theme;