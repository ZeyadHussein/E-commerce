import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
  PLATFORM_ID
} from '@angular/core';

import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { CartService } from '../../pages/cart/services/cart/cart.service';

import { WishlistItem } from '../../../shared/models/wishlist/iwishlist.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'], // fixed typo: styleUrl -> styleUrls
})
export class WishlistComponent implements OnInit {

  private readonly _wishlistService = inject(WishlistService);
  private readonly _cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  private readonly platformId = inject(PLATFORM_ID);

  wishlistDetails: WritableSignal<WishlistItem[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    // Only fetch wishlist on the browser
    if (isPlatformBrowser(this.platformId)) {
      this.getWishlistData();
    }
  }

  getWishlistData(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.isLoading.set(true);

    this._wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishlistDetails.set(res.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load wishlist:', err);
        this.isLoading.set(false);
      }
    });
  }

  addToCart(id: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this._cartService.numOfCartItems.next(res.numOfCartItems);
          this.toastr.success("Moved to cart successfully", "FreshCart");

          // Remove from wishlist after successfully adding to cart
          this._wishlistService.removeFromWishlist(id).subscribe({
            next: (wishlistRes) => {
              this.wishlistDetails.set(
                this.wishlistDetails().filter(item => item._id !== id)
              );
              this._wishlistService.wishlistIds.set(wishlistRes.data);
            },
            error: (err) => {
              console.error('Failed to remove from wishlist:', err);
            }
          });
        } else {
          this.toastr.error(res.message || 'Failed to add to cart', 'FreshCart');
        }
      },
      error: (err) => {
        console.error('Add to cart failed:', err);
        this.toastr.error('Failed to add to cart', 'FreshCart');
      }
    });
  }

  removeItem(id: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this._wishlistService.removeFromWishlist(id).subscribe({
      next: (res) => {
        this.wishlistDetails.set(
          this.wishlistDetails().filter(item => item._id !== id)
        );
        this._wishlistService.wishlistIds.set(res.data);
      },
      error: (err) => {
        console.error('Remove wishlist item failed:', err);
      }
    });
  }
}
