import { Routes } from '@angular/router';
import { AutenticarUsuarioComponent } from './components/pages/autenticar-usuario/autenticar-usuario.component';

export const routes: Routes = [
    {
        path: 'pages/autenticar-usuario',
        component: AutenticarUsuarioComponent
    },
    {
        path: '', pathMatch: 'full',
        redirectTo: '/pages/autenticar-usuario'
    }
];