import { Component, inject, signal, WritableSignal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Iproduct } from '../../../shared/models/products/iproduct.interface';
import { ProductService } from '../../../core/services/products/product.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { SearchPipe } from '../../../shared/pipes/search-pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  private productsService = inject(ProductService);
  private _wishlistService = inject(WishlistService);

  products: WritableSignal<Iproduct[]> = signal<Iproduct[]>([]);
  totalNumberofPorducts: WritableSignal<number> = signal<number>(0);
  page: number = 1;
  text: string = '';

  ngOnInit(): void {
    this.getProduts(this.page);

    // Sync wishlist IDs from server to service signal
    this._wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        const ids = res.data.map((item: any) => item._id);
        this._wishlistService.wishlistIds.set(ids);
      }
    });
  }

  getProduts(page: number): void {
    this.productsService.getallproducts(page).subscribe({
      next: (res) => {
        this.totalNumberofPorducts.set(res.results);
        this.products.set(res.data);
      },
    });
  }

  changePage(newPage: number): void {
    this.page = newPage;
    this.getProduts(this.page);
  }
}