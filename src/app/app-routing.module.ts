import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PagesModule} from '../pages/pages.module';
import {UserPageComponent} from '../pages/user-page/user-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'user-page', pathMatch: 'full'},
  {path: 'user-page', component: UserPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
