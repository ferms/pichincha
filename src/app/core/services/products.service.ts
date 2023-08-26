import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
    return this.http.get<productsModels[]>(
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
    return this.http.post<productsModels>(
      `${this.apiURL}${'/bp/products'}`,
      formData,
      {
        headers,
      }
    );
  }

  
  public updateProducts(formData: productsModels) {
    const headers = new HttpHeaders({
      'authorId':'1143433233',
    });
    return this.http.put<productsModels>(
      `${this.apiURL}${'/bp/products'}`,
      formData,
      {
        headers,
      }
    );
  }

  public deleteProducts(id: string) {
    const headers = new HttpHeaders({
      'authorId':'1143433233',
    });
    let params = new HttpParams().append('id', id);

    return this.http.delete<{ message: string }>(
      `${this.apiURL}${'/bp/products'}`,
      {
        params,
        headers,
      },
      
    );
  }


  public verifiqueProducts(id: string) {
    let params = new HttpParams().append('id', id);
    return this.http.get<any>(
      `${this.apiURL}${'/bp/products/verification'}`,
      {
        params,
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