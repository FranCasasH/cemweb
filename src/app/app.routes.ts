import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClinicaInfoComponent } from './pages/clinica-info/clinica-info.component';
import { CemInfoComponent } from './pages/cem-info/cem-info.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'home', component: HomeComponent},
    {path: 'clinica', component: ClinicaInfoComponent},
    {path: 'cem', component: CemInfoComponent}
];
