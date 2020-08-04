import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameListComponent } from './pages/game-list/game-list.component';
import { GameFormComponent } from './pages/game-form/game-form.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
{ path: 'login', component: LoginComponent},
{ path: 'registro', component: RegistroComponent},
{ path: 'games', component: GameListComponent, canActivate: [AuthGuard] },
{ path: 'game/add', component: GameFormComponent, canActivate: [AuthGuard] },
{ path: 'game/edit/:id', component: GameFormComponent, canActivate: [AuthGuard]},
{ path: '',   redirectTo: 'login', pathMatch: 'full' },
{ path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
