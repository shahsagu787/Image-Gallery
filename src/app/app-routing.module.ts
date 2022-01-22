import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddImageComponent } from './add-image/add-image.component';
import { DisplayImageComponent } from './display-image/display-image.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  {
    path: 'entry',
    component: DisplayImageComponent

  },
  {
    path: '',
    redirectTo: 'entry',
    pathMatch: 'full' 
  },
  {
    path: 'Add',
    component: AddImageComponent
  },
  {
    path: 'Register',
    component: RegisterUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
