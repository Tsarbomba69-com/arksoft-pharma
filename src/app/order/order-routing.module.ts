import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseProductsComponent} from "@order/components";

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: "full"},
  {path: 'products', component: BrowseProductsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
