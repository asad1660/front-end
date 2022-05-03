import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { UserPageComponent } from './profile-page/user-page/user-page.component';

const routes: Routes = [
  { path: 'user', component: UserPageComponent },
  { path: 'home', component: ProfilePageComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
