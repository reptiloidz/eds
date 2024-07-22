import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DayComponent } from './day/day.component';
import { DayResolver } from './shared/day.resolver';
import { LoginGuard } from './shared/guards/login.guard';
import { AboutPageComponent } from './about-page/about-page.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: LoginPageComponent, canActivate: [LoginGuard] },
    { path: 'signup', component: SignupPageComponent, canActivate: [LoginGuard] },
    { path: 'profile', component: ProfilePageComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'day/:date', component: DayComponent, resolve: { day: DayResolver } }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
