import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IWishlist, IWishlistDetails } from '../../../shared/models/wishlist/iwishlist.interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly _httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  wishlistIds: WritableSignal<string[]> = signal([]);

  addToWishlist(id: string): Observable<IWishlist> {
    return this._httpClient.post<IWishlist>(
      `${this.apiUrl}/wishlist`,
      { productId: id }
    );
  }

  removeFromWishlist(id: string): Observable<IWishlist> {
    return this._httpClient.delete<IWishlist>(
      `${this.apiUrl}/wishlist/${id}`
    );
  }

  getLoggedUserWishlist(): Observable<IWishlistDetails> {
    return this._httpClient.get<IWishlistDetails>(
      `${this.apiUrl}/wishlist`
    );
  }
}
