import { Component } from '@angular/core';
import {HeaderComponent} from './components/header/header.component'
import { BannerComponent } from './components/banner/banner.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ServicesComponent } from './components/services/services.component';
import { DoctorsComponent } from './components/doctors/doctors.component'; 
import { DepartmentsComponent } from './components/departments/departments.component';
import { BookingComponent} from './components/booking/booking.component';
import { FooterComponent } from './components/footer/footer.component'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent,BannerComponent,AboutUsComponent,ServicesComponent,DepartmentsComponent,DoctorsComponent,BookingComponent,FooterComponent]
})
export class AppComponent {
  title = 'medico';
}
