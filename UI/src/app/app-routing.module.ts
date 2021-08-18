import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultTemplateComponent } from './common/templates/default-template/default-template.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [{
  path: '',
  component: DefaultTemplateComponent,

  children: [
    {
      path: 'user',
      loadChildren: './modules/user/user.module#UserModule',
      canActivate: [AuthGuard]
    },
    {
      path: 'product',
      loadChildren: './modules/product/product.module#ProductModule'
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
