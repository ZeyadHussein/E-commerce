import { CartService } from './../cart/services/cart/cart.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from '../../../core/services/product-details/product-details.service';
import { Iproduct } from '../../../shared/models/products/iproduct.interface';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly _cartService = inject(CartService);
  private readonly _wishlistService = inject(WishlistService);
  wishlistIds = this._wishlistService.wishlistIds;
  productId: string | null = null;
  productDetails: WritableSignal<Iproduct | null> = signal<Iproduct | null>(null);
  ngOnInit(): void {
    this.getProductId();


  }
  getProductId() {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get('id');
        this.getProduct(this.productId);
      }
    });
  }
  getProduct(id: string | null) {
    this.productDetailsService.getaproductDetails(id).subscribe({
      next: (res) => {
        this.productDetails.set(res.data);

      },
      error: (err) => {
        console.error('Error fetching product details', err)
      },

    })
  };

  addToCart(id: string): void {
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._cartService.numOfCartItems.next(res.numOfCartItems);
        // alert(res.message); // Optional alert
      }
    });
  }

toggleWishlist(id: string): void {
    const isFav = this.wishlistIds().includes(id);

    if (isFav) {
      this._wishlistService.removeFromWishlist(id).subscribe({
        next: (res) => {
          // FIX: Corrected variable names and added type string for itemId
          this._wishlistService.wishlistIds.set(
            this.wishlistIds().filter((itemId: string) => itemId !== id)
          );
        }
      });
    } else {
      this._wishlistService.addToWishlist(id).subscribe({
        next: (res) => {
          // API returns updated array in res.data
          this._wishlistService.wishlistIds.set(res.data);
        }
      });
    }
  }
}

