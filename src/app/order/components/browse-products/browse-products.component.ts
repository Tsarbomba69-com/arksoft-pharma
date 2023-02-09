import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "@product/models";
import {AlertService} from "@core/services";
import {MessageService} from "primeng/api";
import {ProductService} from "@product/services";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-browse-products',
  templateUrl: './browse-products.component.html',
  styleUrls: ['./browse-products.component.scss']
})
export class BrowseProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  subscriptions: Subscription[] = [];
  loading: boolean = true;

  constructor(
    private alertService: AlertService,
    private msgSrv: MessageService,
    private productService: ProductService) {
    this.alertService.messageService = this.msgSrv;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(this.productService.getProducts().subscribe(ps => {
      this.products = ps;
      this.loading = false;
    }));
  }

}
