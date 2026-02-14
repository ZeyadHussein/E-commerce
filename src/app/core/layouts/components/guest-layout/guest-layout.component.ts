import { Component } from '@angular/core';
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-guest-layout',
  imports: [FooterComponent, NavbarComponent, RouterOutlet],
  templateUrl: './guest-layout.component.html',
  styleUrl: './guest-layout.component.css',
})
export class GuestLayoutComponent {

}
