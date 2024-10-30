import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../models/Product.model';

@Component({
  selector: 'app-low-stock-alert',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './low-stock-alert.component.html',
  styleUrls: ['./low-stock-alert.component.css']
})
export class LowStockAlertComponent {
  @Input() lowStockProducts: Product[] = [];
}
