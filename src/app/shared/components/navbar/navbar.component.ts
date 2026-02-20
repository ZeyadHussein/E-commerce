import { Component, Input, signal, WritableSignal, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../features/pages/cart/services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../../core/services/translation/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input({ required: true }) isUser: boolean = true;
  TotalItems: WritableSignal<number> = signal<number>(0);
  dropdownOpen: WritableSignal<boolean> = signal(false);
  mobileMenuOpen: WritableSignal<boolean> = signal(false);
  languages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ];

  languageDropdownOpen: WritableSignal<boolean> = signal(false);

  constructor(
    private router: Router,
    private cart: CartService,
    public translation: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }



  socialmediaicons = [
    { icon: '<i class="fa-brands fa-facebook-f"></i>', link: 'https://www.facebook.com/' },
    { icon: '<i class="fa-brands fa-square-instagram"></i>', link: 'https://www.instagram.com' },
    { icon: '<i class="fa-brands fa-twitter"></i>', link: 'https://www.twitter.com' },
  ];

  pages = [
    { TEXT: 'Home', ARABIC: 'الرئيسية', Link: '/home' },
    { TEXT: 'Products', ARABIC: 'المنتجات', Link: '/products' },
    { TEXT: 'Cart', ARABIC: 'السلة', Link: '/cart' },
    { TEXT: 'Categories', ARABIC: 'الفئات', Link: '/categories' },
    { TEXT: 'Brand', ARABIC: 'العلامة التجارية', Link: '/brand' },
    { TEXT: 'Wishlist', ARABIC: 'قائمة الأمنيات', Link: '/wishlist' },
  ];
  authpages = [
    { TEXT: 'Login', ARABIC: 'تسجيل الدخول', Link: '/login' },
    { TEXT: 'Signup', ARABIC: 'إنشاء حساب', Link: '/signup' },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cart.getLoggedUserCart().subscribe((res) => {
        this.TotalItems.set(res.numOfCartItems);
      });

      this.cart.numOfCartItems.subscribe((res) => {
        this.TotalItems.set(res);
      });
    }
  }

  signout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userToken');
      this.router.navigate(['/login']);
    }
  }


  toggleDropdown() {
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  navigateToChangePassword() {
    this.router.navigate(['/changepassword']);
    this.dropdownOpen.set(false);
  }
  changeLanguage(lang: string) {
    this.translation.setLanguage(lang);
    this.languageDropdownOpen.set(false);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());

    if (this.mobileMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}
