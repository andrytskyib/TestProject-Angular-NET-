import { RouterModule, Routes } from '@angular/router';
import { UserComponent} from './user/user.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent
  }
];

export const userRouting = RouterModule.forChild(userRoutes);
