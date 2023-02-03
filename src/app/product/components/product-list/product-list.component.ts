import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {CATEGORIES, Category, Product} from "@product/models";
import {Subscription} from "rxjs";
import {AlertService} from "@core/services";
import {ProductService} from "@product/services";
import {FileUpload} from "primeng/fileupload";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [{
    name: 'Iboprufeno',
    price: 1500,
    id: 1,
    description: '',
    category: CATEGORIES[0],
    image: ''
  }];
  productDialog: boolean = false;
  categories: Category[] = CATEGORIES;
  product: Product = {
    name: '',
    price: 0.0,
    description: '',
    category: CATEGORIES[0],
    image: ''
  };
  newProduct: Product = {...this.product};
  form: FormData = new FormData();

  selectedProducts: Product[] = [];

  submitted: boolean = false;
  loading: boolean = true;
  private subscriptions: Subscription[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService,
    private productService: ProductService) {
    this.alertService.messageService = this.messageService;
  }

  ngOnInit() {
    this.subscriptions.push(this.productService.getProducts().subscribe(ps => {
      this.products = ps;
      this.loading = false;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  openNew() {
    this.product = this.newProduct;
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que deseja remover os produtos selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts = [];
        this.messageService.add({severity: 'success', summary: 'Successo', detail: 'Produto removido', life: 3000});
      }
    });
  }

  editProduct(product: Product) {
    this.product = {...product};
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende remover ' + product.name + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.product = this.newProduct;
        this.messageService.add({severity: 'success', summary: 'Successo', detail: 'Produto removido', life: 3000});
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    this.loading = true;

    if (!this.product.name?.trim()) return;
    this.product.image = '';
    this.form.append('product', JSON.stringify(this.product));
    this.subscriptions.push(
      (this.product.id! > 0 ? this.productService.putProduct(this.product.id!, this.form) : this.productService.postProduct(this.form))
        .subscribe({
          next: product => {
            if (this.product.id) {
              this.products[this.findIndexById(this.product.id)] = product;
              this.alertService.successAlert('Produto actualizado');
            } else {
              this.products.push(product);
              this.alertService.successAlert('Produto registrado');
              this.product.image = '';
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {...this.newProduct};
            this.form = new FormData();
          },
          error: err => {
            this.alertService.errorAlert(err);
            this.form.delete("product");
          }
        })
    );

  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  setImage(e: any, product: Product, uploader: FileUpload) {
    const reader = new FileReader();
    reader.readAsDataURL(e.files[0]);
    reader.onload = () => {
      product.image = reader.result as string;
      this.form.append('image', product.image);
      uploader.clear();
    };
  }
}
