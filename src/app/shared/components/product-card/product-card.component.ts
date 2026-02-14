import { Component, inject, Input, PLATFORM_ID } from '@angular/core';
import { Iproduct } from '../../models/products/iproduct.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, LowerCasePipe } from '@angular/common';
import { CartService } from '../../../features/pages/cart/services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ShortenPipe } from '../../../core/pipes/shorten/shorten-pipe';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, LowerCasePipe, CurrencyPipe, ShortenPipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Iproduct;

  private readonly cartService = inject(CartService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly toastrService = inject(ToastrService);

  private _wishlistService = inject(WishlistService);

  wishlistIds = this._wishlistService.wishlistIds;





  toggleWishlist(id: string): void {
    const isFav = this.wishlistIds().includes(id);

    if (isFav) {
      this._wishlistService.removeFromWishlist(id).subscribe({
        next: (res) => {
          // Update global signal
          this._wishlistService.wishlistIds.set(this.wishlistIds().filter(itemId => itemId !== id));
        }
      });
    } else {
      this._wishlistService.addToWishlist(id).subscribe({
        next: (res) => {
          // API returns updated ID array in res.data
          this._wishlistService.wishlistIds.set(res.data);
        }
      });
    }
  }

  get isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return !!localStorage.getItem('userToken');
  }

  addProductItem(id: string): void {
    if (!this.isLoggedIn) return;

    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartService.numOfCartItems.next(res.numOfCartItems);
          this.toastrService.success(res.message, 'FreshCart');
        }
      },
      error: (err) => {
        console.error('Error adding to cart ❌', err);
      },
    });
  }
}
