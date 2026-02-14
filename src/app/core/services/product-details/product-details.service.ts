import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Iproduct } from '../../../shared/models/products/iproduct.interface';
import { Iresult } from '../../../shared/models/result/iresult.interface';


@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {

  apiUrl: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) {

  }

  getaproductDetails(id: string | null):Observable<{data: Iproduct}> {
    return this.http.get<{ data: Iproduct }>(this.apiUrl + `/products/${id}`);

  }

}
