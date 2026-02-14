import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

import { Icart } from '../../models/icart';
import { IcartDetails } from '../../models/icart-details';
import { PaymentDetails } from '../../models/payment-details';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  numOfCartItems: BehaviorSubject<number> = new BehaviorSubject(0);

  /**
   * Get Authorization headers if on browser and token exists.
   * Returns null on server to prevent SSR errors.
   */
  private getAuthHeaders(): HttpHeaders | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const token = localStorage.getItem('userToken');
    if (!token) return null;

    return new HttpHeaders({ token });
  }

  addProductToCart(id: string): Observable<Icart> {
    const headers = this.getAuthHeaders();

    // Skip server-side or not-logged-in requests
    if (!headers) {
      return of({
        status: 'error',
        message: 'Not logged in',
        numOfCartItems: 0,
      } as Icart);
    }

    return this.httpClient.post<Icart>(
      `${environment.apiUrl}/cart`,
      { productId: id },
      { headers }
    );
  }

  getLoggedUserCart(): Observable<IcartDetails> {
    const headers = this.getAuthHeaders();

    if (!headers) {
      return of({
        numOfCartItems: 0,
        cartId: '',
        status: 'error',
        data: {} as any,
      } as IcartDetails);
    }

    return this.httpClient.get<IcartDetails>(`${environment.apiUrl}/cart`, { headers });
  }

  removeProductFromCart(id: string): Observable<IcartDetails> {
    const headers = this.getAuthHeaders();

    if (!headers) {
      return of({
        numOfCartItems: 0,
        cartId: '',
        status: 'error',
        data: {} as any,
      } as IcartDetails);
    }

    return this.httpClient.delete<IcartDetails>(
      `${environment.apiUrl}/cart/${id}`,
      { headers }
    );
  }

  updateCartProductQuantity(id: string, count: number): Observable<IcartDetails> {
    const headers = this.getAuthHeaders();

    if (!headers) {
      return of({
        numOfCartItems: 0,
        cartId: '',
        status: 'error',
        data: {} as any,
      } as IcartDetails);
    }

    return this.httpClient.put<IcartDetails>(
      `${environment.apiUrl}/cart/${id}`,
      { count },
      { headers }
    );
  }

  checkoutSession(cartId: string | null, checkoutData: object): Observable<PaymentDetails> {
    const headers = this.getAuthHeaders();

    if (!headers) return throwError(() => new Error('Not logged in'));

    return this.httpClient.post<PaymentDetails>(
      `${environment.apiUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      checkoutData,
      { headers }
    );
  }

  createCashOrder(cartId: string, shippingAddress: object): Observable<any> {
    const headers = this.getAuthHeaders();

    if (!headers) return throwError(() => new Error('Not logged in'));

    return this.httpClient.post(
      `${environment.apiUrl}/orders/${cartId}`,
      { shippingAddress },
      { headers }
    );
  }
}
