import { Routes } from '@angular/router';
import { AutenticarUsuarioComponent } from './components/pages/autenticar-usuario/autenticar-usuario.component';
import { MenuComponent } from './components/pages/menu/menu.component';
import { ConsultarSistemasComponent } from './components/pages/consultar-sistemas/consultar-sistemas.component';
import { CadastrarSistemasComponent } from './components/pages/cadastrar-sistemas/cadastrar-sistemas.component';
import { EditarSistemasComponent } from './components/pages/editar-sistemas/editar-sistemas.component';
import { ConsultarClientesComponent } from './components/pages/consultar-clientes/consultar-clientes.component';

export const routes: Routes = [
    {
        path: 'pages/consultar-clientes',
        component: ConsultarClientesComponent
    },
    {
        path: 'pages/editar-sistemas/:id',
        component: EditarSistemasComponent
    },
    {
        path: 'pages/cadastrar-sistemas',
        component: CadastrarSistemasComponent
    },
    {
        path: 'pages/consultar-sistemas',
        component: ConsultarSistemasComponent
    },
    {
        path: 'pages/menu',
        component: MenuComponent
    },    
    {
        path: 'pages/autenticar-usuario',
        component: AutenticarUsuarioComponent
    },
    {
        path: '', pathMatch: 'full',
        redirectTo: '/pages/autenticar-usuario'
    }
];