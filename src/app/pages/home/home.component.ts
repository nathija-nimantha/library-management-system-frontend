import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
}