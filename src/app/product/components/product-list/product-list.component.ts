import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {CATEGORIES, Category, Product} from "@product/models";
import {Subscription} from "rxjs";
import {AlertService} from "@core/services";
import {ProductService} from "@product/services";
import {FileUpload} from "primeng/fileupload";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productDialog: boolean = false;
  categories: Category[] = CATEGORIES;
  FORM = {
    name: 'name',
    price: 'price',
    description: 'description',
    category: 'categoryName',
    image: 'image',
    id: 'id',
    imgFile: 'imgFile'
  };
  initValue = {
    [this.FORM.name]: '',
    [this.FORM.price]: 0.0,
    [this.FORM.description]: '',
    [this.FORM.id]: 0,
    [this.FORM.image]: '',
    [this.FORM.category]: CATEGORIES[0].name
  }
  initCtrl = {
    [this.FORM.id]: 0,
    [this.FORM.name]: ['', [Validators.required, Validators.maxLength(60)]],
    [this.FORM.price]: [0.0, [Validators.required, Validators.min(0)]],
    [this.FORM.description]: '',
    [this.FORM.category]: [CATEGORIES[0].name, Validators.required],
    [this.FORM.image]: '',
    [this.FORM.imgFile]: null
  }
  form: FormGroup = this.fb.group(this.initCtrl);

  selectedProducts: Product[] = [];

  submitted: boolean = false;
  loading: boolean = true;
  private subscriptions: Subscription[] = [];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private productService: ProductService) {
    this.alertService.messageService = this.messageService;
  }

  get f() {
    return this.form.controls
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
    this.form.reset(this.initValue);
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que deseja remover os produtos selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        this.productService.deleteProducts(this.selectedProducts).subscribe({
          next: () => {
            this.products = this.products.filter(val => !this.selectedProducts.includes(val));
            this.selectedProducts = [];
            this.alertService.success('Produtos selecionados removidos');
            this.loading = false;
          },
          error: err => {
            this.alertService.error(err);
          }
        })
      }
    });
  }

  editProduct(product: Product) {
    this.form.patchValue(product);
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende remover ' + product.name + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        this.subscriptions.push(this.productService.deleteProduct(product.id!).subscribe({
          next: () => {
            this.products = this.products.filter(val => val.id !== product.id);
            this.form.reset(this.initValue);
            this.alertService.success('Produto removido');
            this.loading = false;
          },
          error: err => {
            this.alertService.error(err);
            this.loading = false;
          }
        }));
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.form.invalid) return;
    this.loading = true;
    const form = new FormData();
    form.append(this.FORM.id, this.f[this.FORM.id].value);
    form.append(this.FORM.name, this.f[this.FORM.name].value);
    form.append(this.FORM.price, this.f[this.FORM.price].value);
    form.append(this.FORM.description, this.f[this.FORM.description].value);
    form.append(this.FORM.category, this.f[this.FORM.category].value);
    form.append(this.FORM.imgFile, this.f[this.FORM.imgFile].value ?? new Blob());
    this.subscriptions.push(
      (this.f[this.FORM.id].value > 0 ?
        this.productService.putProduct(this.f[this.FORM.id].value, form) :
        this.productService.postProduct(form))
        .subscribe({
          next: product => {
            if (this.f[this.FORM.id].value > 0) {
              this.products[this.findIndexById(this.f[this.FORM.id].value)] = product;
              this.alertService.success('Produto actualizado');
            } else {
              this.products.push(product);
              this.alertService.success('Produto registrado');
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.form.reset(this.initValue);
            this.loading = false;
          },
          error: err => {
            this.alertService.error(err);
            this.loading = false;
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
    this.f[this.FORM.imgFile].patchValue(e.files[0]);
    reader.readAsDataURL(e.files[0]);
    reader.onload = () => {
      this.f[this.FORM.image].patchValue(reader.result as string);
      uploader.clear();
    };
  }
}
