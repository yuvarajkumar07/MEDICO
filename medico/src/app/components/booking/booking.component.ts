import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms'; // ✅ Import this


@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule,HttpClientModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  appointmentForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.appointmentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      service: ['', Validators.required],
      time: ['', Validators.required],
      note: ['']
    });
}
submitAppointment() {
  if (this.appointmentForm.valid) {
    const appointmentData = this.appointmentForm.value;
    this.http.post('http://localhost:3000/send-booking', appointmentData).subscribe({
      next: response => {
        alert(`booking done Successfully`);
        this.appointmentForm.reset({
          service: '',
          time: ''
        }); 
      },
      error: err => console.error('Error:', err)
    });
  }
}
}