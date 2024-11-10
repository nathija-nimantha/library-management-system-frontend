import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import AOS from 'aos';

@Component({
  standalone: true,
  selector: 'app-customer-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  ngOnInit(): void {
    AOS.init({ duration: 1000, once: true });
  }
}
