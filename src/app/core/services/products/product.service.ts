import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Iresult } from '../../../shared/models/result/iresult.interface';
import { Iproduct } from '../../../shared/models/products/iproduct.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {

  }


  getallproducts(page:number=1): Observable<Iresult<Iproduct[]>> {
    return this.http.get<Iresult<Iproduct[]>>(this.apiUrl + `/products?page=${page}&limit=10`);
    
  }


}
