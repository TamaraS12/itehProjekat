import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationsComponent } from './components/accommodations/accommodations.component';
import { BookingStatisticsComponent } from './components/booking-statistics/booking-statistics.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  

  {path: '' , component: HomeComponent, children: [
    {path: 'accommodations', component: AccommodationsComponent},
    {path: 'bookings', component: BookingsComponent},
    {path: 'statistics', component: BookingStatisticsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
