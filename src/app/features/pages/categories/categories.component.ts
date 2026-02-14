import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Icategory } from '../../../shared/models/categories/icategory.interface';
import { Isubcategories } from '../../../shared/models/sub-categories/isubcategories.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly _categoriesService = inject(CategoriesService);

  categories = signal<Icategory[]>([]);
  specificSubcategories = signal<Isubcategories[]>([]);
  selectedCategoryName = signal<string>('');

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this._categoriesService.getallcategories().subscribe({
      next: (res) => this.categories.set(res.data),
      error: (err) => console.error(err)
    });
  }

  // Called when clicking a category card
  showSubcategories(categoryId: string, categoryName: string): void {
    this.selectedCategoryName.set(categoryName);
    this._categoriesService.getSubcategories(categoryId).subscribe({
      next: (res) => {
        this.specificSubcategories.set(res.data);
        // Scroll to subcategories section smoothly
        setTimeout(() => {
          document.getElementById('sub-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      },
      error: (err) => console.error(err)
    });
  }
}