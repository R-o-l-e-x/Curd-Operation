import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcomProductService {

  private baseUrl = 'https://localhost:44339/api/Product';
  constructor(private http: HttpClient) { }

  createProduct(product: EcomProduct): Observable<EcomProduct> {
    return this.http.post<EcomProduct>(`${this.baseUrl}`, product);
  }
  updateProduct(product: EcomProduct,id:number): Observable<EcomProduct> {
    return this.http.put<EcomProduct>(`${this.baseUrl}?id=${id}`, product);
  }
  getProduct(id:number): Observable<EcomProduct> {
    return this.http.get<EcomProduct>(`${this.baseUrl}/getSingleProduct?id=${id}`);
  }
  deletProduct(id:number): Observable<EcomProduct> {
    return this.http.delete<EcomProduct>(`${this.baseUrl}/deleteProduct?id=${id}` );
  }
  getProductTotal(): Observable<EcomProduct> {
    return this.http.get<EcomProduct>(`${this.baseUrl}/getTotalProduct`);
    }
  getProducts(
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortOrder: string,
    category?: string,
    productId?: string,
    productName?: string
  ): Observable<EcomProduct[]> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);
    if (category) {
      params = params.set('category', category);
    }
    if (productId) {
      params = params.set('productId', productId);
    }
    if (productName) {
      params = params.set('productName', productName);
    }

    return this.http.get<EcomProduct[]>(this.baseUrl, { params });
  }
}

export interface EcomProduct {
  productId: number;
  productName: string;
  shortName: string;
  category: string;
  price: number;
  thumbnailImageUrl?: string;
  deliveryTimeSpan?: string;
}
