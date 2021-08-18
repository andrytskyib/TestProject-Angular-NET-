import { RouterModule, Routes } from '@angular/router';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const productsRoute: Routes = [
  {
    path: '',
    component: ProductOverviewComponent,
  },
  {
    path: ':id',
    component: ProductDetailComponent,
  }
];

export const ProductRouting = RouterModule.forChild(productsRoute);
