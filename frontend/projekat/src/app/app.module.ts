import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccommodationsComponent } from './components/accommodations/accommodations.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { AccommodationCardComponent } from './components/accommodation-card/accommodation-card.component';
import { FrameDirective } from './directives/frame.directive';
import {TableModule} from 'primeng/table';
import { TaxPipe } from './pipes/tax.pipe';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { AccommodationDialogComponent } from './components/accommodation-dialog/accommodation-dialog.component';
import {MatInputModule} from '@angular/material/input';
import { ToastModule } from 'primeng/toast';
import { BookingDialogComponent } from './components/booking-dialog/booking-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AccommodationsComponent,
    BookingsComponent,
    AccommodationCardComponent,
    FrameDirective,
    TaxPipe,
    LoginComponent,
    HomeComponent,
    AccommodationDialogComponent,
    BookingDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TableModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    ToastModule,
    MatDatepickerModule,
    MatNativeDateModule,
    InputTextModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
