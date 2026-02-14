import { Iproduct } from './../../../../../shared/models/products/iproduct.interface';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../../../../core/services/products/product.service';
import { ProductCardComponent } from "../../../../../shared/components/product-card/product-card.component";


@Component({
  selector: 'app-products-section',
  imports: [ProductCardComponent,],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css',
})
export class ProductsSectionComponent {
  productsService = inject(ProductService);
  products: WritableSignal<Iproduct[]> = signal<Iproduct[]>([]);
  constructor() { }
  ngOnInit(): void {
    this.getProduts();

  }
  getProduts(): void {
    this.productsService.getallproducts().subscribe({
      next: (res) => {
        this.products.set(res.data);

      },
      error: (err) => {
        console.error('Error fetching products', err)
      },

    })


  }

}

