import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
})
export class MainSliderComponent {
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
    navText: [ '<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>' ],
    items: 1,
    nav: true
  };

}
