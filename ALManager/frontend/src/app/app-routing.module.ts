import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./services/auth-guard.service";

import { PostsComponent } from './components/posts/posts.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { ProductsComponent } from './components/products/products.component';
import { AssemblyLinesComponent } from './components/assembly-lines/assembly-lines.component';
import { WorkstationsComponent } from './components/workstations/workstations.component';

const routes: Routes = [
  { path: "products", component: ProductsComponent, canActivate: [AuthGuard]},
  { path: "assembly-lines", component: AssemblyLinesComponent, canActivate: [AuthGuard]},
  { path: "workstations", component: WorkstationsComponent, canActivate: [AuthGuard]},


  { path: "posts", component: PostsComponent, canActivate: [AuthGuard]},
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "**", redirectTo: "login" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
