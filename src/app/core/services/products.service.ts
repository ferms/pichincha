import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }


  public getAllProducts() {
    const headers = new HttpHeaders({
      'authorId':'1143433233',
    });
    return this.http.get<any>(
      `${this.apiURL}${'/bp/products'}`,
      {
        headers,
      }
    );
  }

  public createProducts(formData: productsModels) {
    const headers = new HttpHeaders({
      'authorId':'1143433233',
    });
    return this.http.post<any>(
      `${this.apiURL}${'/bp/products'}`,
      formData,
      {
        headers,
      }
    );
  }

}


export interface productsModels {
  id: string,
  name: string,
  description: string,
  logo: string,
  date_release:  Date | string,
  date_revision: Date | string,
}