import { Routes } from '@angular/router';
import { LoginComponent } from './componenets/login/login.component';
import { CreateProductComponent } from './componenets/create-product/create-product.component';
import { LayoutComponent } from './componenets/layout/layout.component';
import { ProductComponent } from './componenets/product/product.component';
 

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children: [
            {
                path: 'product',
                component: ProductComponent
            },
            {
                path: 'new-product',
                component: CreateProductComponent
            },
            {
                path: 'edit-product',
                component: CreateProductComponent
            }
        ]
    }
    
];
