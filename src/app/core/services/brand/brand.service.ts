import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrandResponse, ISpecificBrandResponse } from '../../../shared/models/brands/ibrands.interface';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly _httpClient = inject(HttpClient);

  getBrands(): Observable<IBrandResponse> {
    return this._httpClient.get<IBrandResponse>(environment.apiUrl+'/brands');
  }

  getSpecificBrand(id: string): Observable<ISpecificBrandResponse> {
    return this._httpClient.get<ISpecificBrandResponse>(environment.apiUrl+`/brands/${id}`);
  }
}