import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  currentIndex = 0;
  intervalId: any;  // Variable para almacenar el ID del temporizador

  slides = [
    'https://source.unsplash.com/600x300/?airplane',
    'https://source.unsplash.com/600x300/?airport',
  ];

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 2000);  // Cambia cada 3 segundos (ajusta según tus preferencias)
  }

  stopCarousel() {
    clearInterval(this.intervalId);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }
}
