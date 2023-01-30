import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [{name: 'Iboprufeno', price: 1500, id: 1}];
  productDialog: boolean = false;

  product!: any;

  selectedProducts: any[] = [];

  submitted: boolean = false;

  categories: any[] = [];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.categories = [
      'Medicamento',
      'Suplemento',
      'Higiene pessoal',
      'Dispositivo médico',
      'Acessório médico',
      'Cosmético'
    ];
  }

  openNew() {
    this.product = {};
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

  editProduct(product: any) {
    this.product = {...product};
    this.productDialog = true;
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende remover ' + product.name + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.product = {};
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

    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({severity: 'success', summary: 'Successo', detail: 'Produto actualizado', life: 3000});
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({severity: 'success', summary: 'Successo', detail: 'Produto registrado', life: 3000});
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

}
