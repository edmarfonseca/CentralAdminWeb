import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guards';
import { LoginGuard } from './guards/login.guard';
import { AutenticarUsuarioComponent } from './components/pages/autenticar-usuario/autenticar-usuario.component';
import { MenuComponent } from './components/pages/menu/menu.component';
import { ConsultarSistemasComponent } from './components/pages/consultar-sistemas/consultar-sistemas.component';
import { CadastrarSistemasComponent } from './components/pages/cadastrar-sistemas/cadastrar-sistemas.component';
import { EditarSistemasComponent } from './components/pages/editar-sistemas/editar-sistemas.component';
import { ConsultarClientesComponent } from './components/pages/consultar-clientes/consultar-clientes.component';
import { EditarClientesComponent } from './components/pages/editar-clientes/editar-clientes.component';
import { CadastrarClientesComponent } from './components/pages/cadastrar-clientes/cadastrar-clientes.component';

export const routes: Routes = [
    {
        path: 'pages/editar-clientes/:id',
        component: EditarClientesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pages/cadastrar-clientes',
        component: CadastrarClientesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pages/consultar-clientes',
        component: ConsultarClientesComponent,
        canActivate: [AuthGuard]
    },    
    {
        path: 'pages/editar-sistemas/:id',
        component: EditarSistemasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pages/cadastrar-sistemas',
        component: CadastrarSistemasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pages/consultar-sistemas',
        component: ConsultarSistemasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pages/menu',
        component: MenuComponent,
        canActivate: [AuthGuard]
    },    
    {
        path: 'pages/autenticar-usuario',
        component: AutenticarUsuarioComponent,
        canActivate: [LoginGuard]
    },
    {
        path: '', pathMatch: 'full',
        redirectTo: '/pages/autenticar-usuario'
    }
];