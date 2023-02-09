import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderRoutingModule} from './order-routing.module';
import {BrowseProductsComponent} from './components/browse-products/browse-products.component';
import {ToolbarModule} from "primeng/toolbar";
import {SharedModule} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {BadgeModule} from "primeng/badge";
import {ProgressSpinnerModule} from "primeng/progressspinner";


@NgModule({
  declarations: [
    BrowseProductsComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ToolbarModule,
    SharedModule,
    ButtonModule,
    TooltipModule,
    BadgeModule,
    ProgressSpinnerModule
  ]
})
export class OrderModule {
}
