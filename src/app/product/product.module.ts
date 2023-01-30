import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from '@product/product-routing.module';
import {ProductListComponent} from '@product/components';
import {CardModule} from "primeng/card";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";
import {RatingModule} from "primeng/rating";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmationService} from "primeng/api";
import {TooltipModule} from "primeng/tooltip";
import {InputTextareaModule} from "primeng/inputtextarea";


@NgModule({
  declarations: [
    ProductListComponent
  ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        CardModule,
        ToolbarModule,
        ButtonModule,
        RippleModule,
        FileUploadModule,
        TableModule,
        RatingModule,
        RadioButtonModule,
        FormsModule,
        InputNumberModule,
        ConfirmDialogModule,
        DialogModule,
        DropdownModule,
        InputTextModule,
        TooltipModule,
        InputTextareaModule
    ],
  providers: [ConfirmationService]
})
export class ProductModule {
}
