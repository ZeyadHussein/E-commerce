import { Component, inject, OnInit, signal, WritableSignal, PLATFORM_ID } from '@angular/core';
import { CartService } from './services/cart/cart.service';
import { CartDetailsData, IcartDetails } from './models/icart-details';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService);
  private readonly platformId = inject(PLATFORM_ID);

  cartDetailsData: WritableSignal<CartDetailsData> =
    signal<CartDetailsData>({} as CartDetailsData);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getUserCartData();
    }
  }

  getUserCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res: IcartDetails) => {
        if (res.status === 'success') {
          this.cartDetailsData.set(res.data);
        }
      },
      error: (err: any) => {
        console.error('Error fetching cart:', err);
      }
    });
  }

  removeProductItemfromcart(id: string): void {
    this.cartService.removeProductFromCart(id).subscribe({
      next: (res: IcartDetails) => {
        if (res.status === 'success') {
          this.cartDetailsData.set(res.data);
          this.cartService.numOfCartItems.next(res.numOfCartItems);
        }
      },
      error: (err: any) => {
        console.error('Error removing product:', err);
      }
    });
  }

  updateProductCount(id: string, count: number): void {
    if (count < 1) return;

    this.cartService.updateCartProductQuantity(id, count).subscribe({
      next: (res: IcartDetails) => {
        if (res.status === 'success') {
          this.cartDetailsData.set(res.data);
        }
      },
      error: (err: any) => console.error('Error updating quantity:', err)
    });
  }
}
