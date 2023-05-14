import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
    data: { queryParams: ['id'] }
  },
  {
    path: '',
    component: HomeComponent,
    data: { queryParams: ['_id'] }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
