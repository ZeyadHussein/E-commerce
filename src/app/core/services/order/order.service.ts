import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Order } from '../../../shared/models/order/order.interface';


@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private readonly httpClient = inject(HttpClient);

  getUserOrders(userId: string): Observable<Order[]> {
    return this.httpClient.get<Order[]>(
      `${environment.apiUrl}/orders/user/${userId}`
    );
  }
}
