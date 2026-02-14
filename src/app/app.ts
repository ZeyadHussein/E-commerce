import { Component, signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
import { NgxSpinnerService, NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('E-commerce');
  private platformId = inject(PLATFORM_ID);
  constructor(private flowbiteService: FlowbiteService,
  ) { }


  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    
    });
  }
}
