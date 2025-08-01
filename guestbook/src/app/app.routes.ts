import { Routes } from '@angular/router';
import { HomeComponent } from './guest/home/home.component';

export const routes: Routes = [
    {path:"guests/home" , component:HomeComponent},
    {path:"guests",redirectTo:"guests/home",pathMatch:"full"},
    {path:"",redirectTo:"guests/home",pathMatch:"full"}
];
