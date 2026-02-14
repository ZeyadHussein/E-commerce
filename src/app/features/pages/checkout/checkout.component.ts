import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/services/cart/cart.service';
import { error } from 'console';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);



  cartId: string | null = null;

  ngOnInit(): void {
    this.CheckoutFormInitialization();
    this.getCartId();
  }




  checkoutForm!: FormGroup;

  CheckoutFormInitialization(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, Validators.required],
        phone: [null, [Validators.required, Validators.pattern('^01[012][0-9]{8}$')]],
        city: [null, [Validators.required]]

      })
    });
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({

      next: (urlParams) => {
        this.cartId = urlParams.get('id');
      }
    })
  }



 onSubmitCheckoutForm(paymentType: string): void {
    if (!this.cartId) {
      console.error('Cart ID is missing!');
      return;
    }

    if (this.checkoutForm.valid) {
      // Extract the shippingAddress group values
      const addressData = this.checkoutForm.get('shippingAddress')?.value;

      if (paymentType === 'online') {
        // Stripe / Visa Logic
        this.cartService.checkoutSession(this.cartId, this.checkoutForm.value).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              window.open(res.session.url, '_self');
            }
          },
          error: (err) => console.log(err)
        });
      } else {
        // Cash On Delivery Logic
        this.cartService.createCashOrder(this.cartId, addressData).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              // Successfully placed order, navigate to all orders or success page
              this.router.navigate(['/allorders']);
            }
          },
          error: (err) => console.log(err)
        });
      }
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}