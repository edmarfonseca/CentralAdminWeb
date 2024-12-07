import { Routes } from '@angular/router';
import { AutenticarUsuarioComponent } from './components/pages/autenticar-usuario/autenticar-usuario.component';
import { MenuComponent } from './components/pages/menu/menu.component';

export const routes: Routes = [
    {
        path: 'pages/autenticar-usuario',
        component: AutenticarUsuarioComponent
    },
    {
        path: 'pages/menu',
        component: MenuComponent
    },
    {
        path: '', pathMatch: 'full',
        redirectTo: '/pages/autenticar-usuario'
    }
];