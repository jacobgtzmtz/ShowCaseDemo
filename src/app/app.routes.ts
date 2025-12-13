import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page';
import { authGuard } from './features/auth/guards/auth-guard';

export const routes: Routes = [

    { path: 'home', component: LandingPage },
    { path: 'products', loadComponent: () => import('./features/products/products-list/products-list') },
    { path: 'products/new', loadComponent: () => import('./features/products/product-form/product-form') },
    { path: 'products/:id', loadComponent: () => import('./features/products/product-details/product-details')},
    { path: 'shopping-cart', loadComponent: () => import('./features/cart-list/cart-list')},
    { path: 'login', loadComponent: () => import('./features/auth/pages/login-component/login-component')},
    { path: 'register', loadComponent: () => import('./features/auth/pages/register-component/register-component')},
    { path: 'admin-panel', loadComponent: () => import('./pages/admin-panel/admin-panel'), canActivate: [authGuard]},


    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', loadComponent: () => import('./pages/not-found') }

];
