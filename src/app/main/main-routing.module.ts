import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {AuthGuard} from "@core/guards";
import {Role} from "@core/models";
import {LoginFormComponent} from "@core/components";
import {DashboardComponent} from "@user/components";
import {AllowAnonymousGuard} from "@core/guards";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    data: {role: [Role.ADMIN, Role.PHARMACIST]},
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent, data: {role: [Role.ADMIN]}},
      {
        path: 'user',
        data: {role: [Role.ADMIN]},
        loadChildren: () => import('@user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'product',
        loadChildren: () => import('@product/product.module').then(m => m.ProductModule),
        data: {role: [Role.ADMIN, Role.PHARMACIST]}
      },
      {
        path: 'order',
        loadChildren: () => import('@order/order.module').then(m => m.OrderModule),
        data: {role: [Role.ADMIN, Role.PHARMACIST]}
      },
    ]
  },
  {path: 'login', component: LoginFormComponent, canActivate: [AllowAnonymousGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
