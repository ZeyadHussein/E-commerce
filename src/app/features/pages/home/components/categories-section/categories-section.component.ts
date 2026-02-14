import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../../../core/services/categories/categories.service';
import { Icategory } from '../../../../../shared/models/categories/icategory.interface';
import { CategoryCardComponent } from "../../../../../shared/components/category-card/category-card.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-categories-section',
  imports: [CategoryCardComponent, CarouselModule],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.css',
})
export class CategoriesSectionComponent {

  private readonly CategoriesService = inject(CategoriesService);

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 150,
    autoplay: true,
    autoplayTimeout: 1000,
    margin: 10,
    navText: [],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: false
  };


categories: WritableSignal<Icategory[]> =signal<Icategory[]>([]) ;
  ngOnInit(): void {
    this.getategories()
  }

  getategories(): void{
    this.CategoriesService.getallcategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
        

      },
      error: (err) => {
        console.error('Error fetching categories', err)
      },

    })

  }
}
