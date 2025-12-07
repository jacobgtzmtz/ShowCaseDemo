import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page';

export const routes: Routes = [

    { path: 'home', component: LandingPage },
    { path: 'products', loadComponent: () => import('./features/products/products-list/products-list') },
    { path: 'products/new', loadComponent: () => import('./features/products/product-form/product-form') },
    { path: 'shopping-cart', loadComponent: () => import('./features/cart-list/cart-list')},


    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', loadComponent: () => import('./pages/not-found') }

];
