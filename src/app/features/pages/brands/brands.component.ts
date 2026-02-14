import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../../core/services/brand/brand.service';
import { Ibrands } from '../../../shared/models/brands/ibrands.interface';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly _brandsService = inject(BrandsService);

  brandsList: WritableSignal<Ibrands[]> = signal([]);
  specificBrand: WritableSignal<Ibrands | null> = signal(null);
  isModalOpen = signal(false);

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(): void {
    this._brandsService.getBrands().subscribe({
      next: (res) => {
        this.brandsList.set(res.data);
      }
    });
  }

  getBrandDetails(id: string): void {
    this._brandsService.getSpecificBrand(id).subscribe({
      next: (res) => {
        this.specificBrand.set(res.data);
        this.isModalOpen.set(true);
      }
    });
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.specificBrand.set(null);
  }
}