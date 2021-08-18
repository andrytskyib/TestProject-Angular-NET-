import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from '../models/product-model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _products = new BehaviorSubject<ProductModel[]>(null);

  readonly products$ = this._products.asObservable();

  private get products(): ProductModel[] {
    return this._products.getValue();
  }

  private set products(val: ProductModel[]) {
    this._products.next(val);
  }

  constructor(public  http: HttpClient) { }

  setProducts(products: ProductModel[]) {
    this.products = products;
  }

  GetProducts() {
    const url = environment.apiUrl + '/product';
    this.http.get<ProductModel[]>(url).pipe(map(res => res)).subscribe(res => {
      this.setProducts(res);
    });
  }

  GetProduct(id) {
    return this.http.get<ProductModel[]>(`http://localhost:3000/product/${id}`).pipe(map(res => res));
  }

  CreateProduct(params: ProductModel): Observable<ProductModel> {
    const url = environment.apiUrl + '/product';
    return this.http.post<ProductModel>(url, params).pipe(map(res => res));
  }

  UpdateProduct(params: ProductModel): Observable<ProductModel> {
    const url = environment.apiUrl + `/product/${params.id}`;
    return this.http.put<ProductModel>(url, params).pipe(map(res => res));
  }

  DeleteProduct(id: string): Observable<{}> {
    const url = environment.apiUrl + `/product/${id}`;
    return this.http.delete<{}>(url);
  }
}
