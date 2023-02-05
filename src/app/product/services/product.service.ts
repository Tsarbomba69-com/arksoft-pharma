import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "@product/models";
import {environment} from "@env/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productURL: string = `${environment.apiUrl}/Products`;

  constructor(private http: HttpClient) {
  }

  putProduct(id: number, product: FormData) {
    return this.http.put<Product>(`${this.productURL}/${id}`, product);
  }

  postProduct(product: FormData) {
    return this.http.post<Product>(this.productURL, product);
  }

  getProducts() {
    return this.http.get<Product[]>(this.productURL);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.productURL}/${id}`);
  }

  deleteProducts(products: Product[]) {
    return this.http.post(`${this.productURL}/batch`, products);
  }
}
