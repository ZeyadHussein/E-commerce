import { Injectable } from '@angular/core';
import { Iresult } from '../../../shared/models/result/iresult.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Icategory } from '../../../shared/models/categories/icategory.interface';
import { Isubcategories } from '../../../shared/models/sub-categories/isubcategories.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  apiUrl: string = environment.apiUrl;
  constructor(private readonly http: HttpClient) {
  }
  getallcategories(): Observable<Iresult<Icategory[]>> {
    return this.http.get<Iresult<Icategory[]>>(this.apiUrl + '/categories');

  }

  getSubcategories(categoryId: string): Observable<Iresult<Isubcategories[]>> {
    return this.http.get<Iresult<Isubcategories[]>>(
      `${this.apiUrl}/categories/${categoryId}/subcategories`
    );
  }


}
