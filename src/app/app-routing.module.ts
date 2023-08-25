import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { VisualizeComponent } from './core/modules/visualize/visualize.component';
import { RegisterComponent } from './core/modules/register/register.component';

const routerOptions: ExtraOptions = {
  useHash: true,
  // scrollOffset: [0, 64],
};

const APP_ROUTES: Routes = [
  { path: 'visualize', component: VisualizeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit/:id', component: RegisterComponent },
  { path: '**', redirectTo: 'visualize', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, routerOptions) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

