import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { OrderService } from '../../../core/services/order/order.service';
import { jwtDecode } from 'jwt-decode';
import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { Order } from '../../../shared/models/order/order.interface';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {

  private readonly orderService = inject(OrderService);
  private readonly platformId = inject(PLATFORM_ID);

  ordersList = signal<Order[]>([]);

  userId: string = '';

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {

      this.getUserIdFromToken();

      if (this.userId) {
        this.getUserOrders();
      }
    }
  }

  getUserIdFromToken(): void {

    const token = localStorage.getItem('userToken');

    if (token) {
      const decoded: any = jwtDecode(token);
      this.userId = decoded.id;
    }
  }

  getUserOrders(): void {

    this.orderService.getUserOrders(this.userId).subscribe({
      next: (res: Order[]) => {
        this.ordersList.set(res);
      },
      error: (err) => {
        console.log("Error fetching orders:", err);
      }
    });
  }
}
