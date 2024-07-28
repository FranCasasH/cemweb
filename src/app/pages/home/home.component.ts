import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const wrapperEl = document.querySelector(".js-wrapper");
      const slides = document.querySelectorAll(".js-slide");

      // Initial State
      slides.forEach((slide, idx) => {
        if (idx === 0) return;
        const slideImage = slide.querySelector("img");
        gsap.set(slide, { yPercent: 100 });
        gsap.set(slideImage, { yPercent: -100 });
      });

      const scroll = () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperEl,
            start: "top top",
            end: `+=${slides.length * 100}%`,
            scrub: true,
            pin: true
            // markers: true
          },
          defaults: { ease: "none" }
        });

        slides.forEach((slide, idx) => {
          if (idx === slides.length - 1) return;
          const slideImg = slide.querySelector("img");
          const nextSlide = slides[idx + 1];
          const nextSlideImg = slides[idx + 1].querySelector("img");
          tl.to(slide, { yPercent: -100 })
            .to(slideImg, { yPercent: 100 }, "<")
            .to(nextSlide, { yPercent: 0 }, "<")
            .to(nextSlideImg, { yPercent: 0 }, "<");
        });
      };

      scroll();

      document.addEventListener("DOMContentLoaded", () => {
        const cards = [
          { id: "#card1", endTranslateX: -2000, rotate: 45 },
          { id: "#card2", endTranslateX: -1000, rotate: -30 },
          { id: "#card3", endTranslateX: -2000, rotate: 45 },
          { id: "#card4", endTranslateX: -1500, rotate: -30 }
        ];

        cards.forEach((card) => {
          ScrollTrigger.create({
            trigger: card.id,
            start: "top top",
            end: "+=1200vh",
            scrub: 1,
            onUpdate: (self) => {
              gsap.to(card.id, {
                x: `${card.endTranslateX * self.progress}px`,
                rotate: `${card.rotate * self.progress *2}`,
                duration: 0.5,
                ease: "power3.Out",
              });
            }
          });
        });

        ScrollTrigger.create({
          trigger: ".wrapper",
          start: "top top",
          end: "+=900vh",
          scrub: 1,
          pin: true,
          onUpdate: self => {
            gsap.to(".wrapper", {
              x: `${-350 * self.progress}vw`,
              duration: 0.5,
              ease: "power3.Out",
            });
          }
        });
      });
    }
  }
}