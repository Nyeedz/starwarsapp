import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./guards/auth/auth.guard";
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";

const routes: Routes = [
  {
    path: "login",
    component: SplashScreenComponent
  },
  {
    path: "",
    loadChildren: "./components/dashboard/dashboard.module#DashboardModule",
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
