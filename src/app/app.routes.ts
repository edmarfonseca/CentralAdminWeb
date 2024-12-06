import { Routes } from '@angular/router';
import { AutenticarUsuariosComponent } from './components/pages/autenticar-usuarios/autenticar-usuarios.component';

export const routes: Routes = [
    {
        path: 'pages/autenticar-usuarios',
        component: AutenticarUsuariosComponent
    },
    {
        path: '', pathMatch: 'full',
        redirectTo: '/pages/autenticar-usuarios'
    }
];