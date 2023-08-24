import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { VisualizeComponent } from './core/modules/visualize/visualize.component';

const routerOptions: ExtraOptions = {
  useHash: true,
  // scrollOffset: [0, 64],
};

const APP_ROUTES: Routes = [
  { path: 'visualize', component: VisualizeComponent },
  { path: '**', redirectTo: 'visualize', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, routerOptions) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

