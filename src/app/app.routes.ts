import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { LowStockAlertComponent } from './low-stock-alert/low-stock-alert.component';
import { AddProductComponent } from './add-product/add-product.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'low-stock', component: LowStockAlertComponent },
];
