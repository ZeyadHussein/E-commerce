import { Component } from '@angular/core';
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-user-layout',
  imports: [FooterComponent, NavbarComponent, RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent {

}
