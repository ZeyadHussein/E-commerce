import { Routes, CanActivateFn, ActivatedRoute } from '@angular/router';
import { GuestLayoutComponent } from './core/layouts/components/guest-layout/guest-layout.component';
import { UserLayoutComponent } from './core/layouts/components/user-layout/user-layout.component';
import { HomeComponent } from './features/pages/home/home.component';
import { LoginComponent } from './core/auth/login/login.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { CategoriesComponent } from './features/pages/categories/categories.component';
import { ProductsComponent } from './features/pages/products/products.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { ProductDetailsComponent } from './features/pages/product-details/product-details.component';
import { BrandsComponent } from './features/pages/brands/brands.component';
import { NotFoundComponent } from './features/pages/not-found/not-found.component';
import { authGuard } from './core/guards/auth/auth-guard';
import { CheckoutComponent } from './features/pages/checkout/checkout.component';
import { AllordersComponent } from './features/pages/allorders/allorders.component';
import { userAuthGuard } from './core/guards/auth-guard/user-auth-guard';
import { WishlistComponent } from './features/wishlist/wishlist/wishlist.component';
import { ForgetpasswordComponent } from './core/auth/forgetpassword/forgetpassword.component';
import { VerifycodeComponent } from './core/auth/verifycode/verifycode.component';
import { ResetpasswordComponent } from './core/auth/resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './core/auth/changepassword/changepassword.component';

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    {
        path: "", component: GuestLayoutComponent, children: [
            {
                path: "login", component: LoginComponent, canActivate: [userAuthGuard],title: 'Login'
            },
            {
                path: 'signup', component: SignupComponent, canActivate: [userAuthGuard],title: 'Sign Up'
            },
            {
                path: "forgotpassword", component: ForgetpasswordComponent, canActivate: [userAuthGuard],title: 'Forget Password'
            },
            { 
                path:"verifycode",component:VerifycodeComponent,canActivate:[userAuthGuard],title: 'Verify Code'
            },
            { 
                path:"resetpassword",component:ResetpasswordComponent,canActivate:[userAuthGuard],title: 'Reset Password'
            },
            
            
        ]
    },
    {
        path: "", component: UserLayoutComponent, children: [
            {
                path: "home", canActivate: [authGuard], component: HomeComponent,title: 'Home'
            },
            {
                path: 'categories', canActivate: [authGuard], component: CategoriesComponent,title: 'Category'
            },
            {
                path: 'cart', canActivate: [authGuard], component: CartComponent,title: 'Cart'
            },
            {
                path: 'products', canActivate: [authGuard], component: ProductsComponent,title: 'Products'
            },
            {
                path: 'product-details/:id', canActivate: [authGuard], component: ProductDetailsComponent,title: 'Product-Details'
            },
            {
                path: 'brand', canActivate: [authGuard], component: BrandsComponent,title: 'Brand'
            },
            {
                path: 'checkout/:id', canActivate: [authGuard], component: CheckoutComponent,title: 'Checkout'
            },
            {
                path: 'allorders', canActivate: [authGuard], component: AllordersComponent, title: 'Orders'
            },
            {
                path: 'wishlist', canActivate: [authGuard], component: WishlistComponent, title: 'wishlist'
            },
            { 
                path:"changepassword",component:ChangepasswordComponent,canActivate:[authGuard]
            },
        ]
    },
    { path: '**', component: NotFoundComponent },
];
