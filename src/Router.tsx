import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPage } from './Login/login';
import { AdminPanel } from './admin-panel/admin-panel-layout';
import { ErrorPage } from './error/error.page';
import { appContext } from './app.context';
import { useState } from 'react';
import { Usuario } from './models/Usuario.model';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { Bienvenida } from './admin-panel/components/bienvenido.component';
import { UsuariosPage } from './admin-panel/usuarios/usuarios-page.component';
import { SensoresPage } from './admin-panel/sensores/sensores-page';
import { DispositivosPage } from './admin-panel/dispositivos/dipositivos-page.component';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/admin-panel",
    element: <AdminPanel />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'welcome',
        element: <Bienvenida />
      },
      {
        path: 'usuarios',
        element: <UsuariosPage />
      },
      {
        path: 'sensores',
        element: <SensoresPage />
      },
      {
        path: 'dispositivos',
        element: <DispositivosPage />
      },
      {
        path: 'perfil'
      }
    ]
  }
]);

function Router() {
  const [usuario, setSession] = useState<Usuario>({ idUsuario: -1, nombre: '', email: '' })
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <appContext.Provider value={{
      usuario, setSession,
      openMenu, setOpenMenu
    }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={routes} />
      </ThemeProvider>
    </appContext.Provider>
  )
}

export default Router
