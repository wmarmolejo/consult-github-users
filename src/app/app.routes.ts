
import { Routes } from '@angular/router';
import { SearchComponent } from '../app/component/search/search.component';
import { UserDetailComponent } from '../app/component/user-detail/user-detail.component';

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'user/:username', component: UserDetailComponent },
];
