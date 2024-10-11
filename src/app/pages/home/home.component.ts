import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const wrapperEl = document.querySelector(".js-wrapper");
      const slides = document.querySelectorAll(".js-slide");
      

      gsap.from(".rectangle", {
        x: "-250%",
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".rectangle",
          start: "top 80%",
          end: "top 50%",
          scrub: true
        }
      });
    
      gsap.from(".rectangle2", {
        x: "250%",
        duration: 2,
        ease: "power2.Out",
        scrollTrigger: {
          trigger: ".rectangle2",
          start: "top 80%",
          end: "top 50%",
          scrub: true
        }
      });

      window.addEventListener("load", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".wrapperzoom",
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: true,
            }
          })
          .to(".zoomin", {
            scale: 2,
            z: 350,
            transformOrigin: "center center",
            ease: "power1.inOut"
          })
          .to(
            ".section.hero",
            {
              scale: 1.1,
              transformOrigin: "center center",
              ease: "power1.inOut"
            },
            "<"
          );
      });

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
                rotate: `${card.rotate * self.progress * 2}`,
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

      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.create({
        trigger: ".pinned",
        start: "top top",
        endTrigger: ".whitespace",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      ScrollTrigger.create({
        trigger: ".appInfo",
        start: "top top",
        endTrigger: ".whitespace",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      ScrollTrigger.create({
        trigger: ".pinned",
        start: "top top",
        endTrigger: ".appInfo",
        end: "bottom bottom",
        onUpdate: (self) => {
          const rotation = self.progress * 360;
          const progress = self.progress;
          const clipPath = `polygon(
            ${45 - 45 * progress}% ${0 + 0 * progress}%,
            ${55 + 45 * progress}% ${0 + 0 * progress}%,
            ${55 + 45 * progress}% ${100 - 0 * progress}%,
            ${45 - 45 * progress}% ${100 - 0 * progress}%
          )`;
          gsap.to(".revealer", { rotation });
          gsap.to(".revealer1, .revealer2", {
            clipPath: clipPath,
            ease: "none",
            duration: 0,
          });
        }
      });

      ScrollTrigger.create({
        trigger: ".appInfo",
        start: "top top",
        end: "bottom 50%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const left = 35 + 15 * progress;
          gsap.to(".revealer", {
            left: `${left}%`,
            ease: "none",
            duration: 0,
          })
        }
      })
      
    ScrollTrigger.create({
      trigger: ".whitespace",
      start: "top 50%",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const scale = 1 + 15 * self.progress;
        gsap.to(".revealer", {
          scale: scale,
          ease: "none",
          duration: 0,
        });
      }
    })

    

    }
    if (typeof document !== 'undefined') {
      const links = document.querySelectorAll('main > .hover-this');
      const cursor = document.querySelector('.cursor') as HTMLElement;

      const animateit: EventListener = function (this: HTMLElement, e: Event) {
        const event = e as MouseEvent;
        const span = this.querySelector('p') as HTMLElement;
        const { offsetX: x, offsetY: y } = event;
        const { offsetWidth: width, offsetHeight: height } = this;
        const move = 25;
        const xMove = (x / width) * (move * 2) - move;
        const yMove = (y / height) * (move * 2) - move;
        span.style.transform = `translate(${xMove}px, ${yMove}px)`;
        if (event.type === 'mouseleave') span.style.transform = '';
      };

      const editCursor: EventListener = (e: Event) => {
        const event = e as MouseEvent;
        const { clientX: x, clientY: y } = event;
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
      };

      links.forEach(link => {
        link.addEventListener('mousemove', animateit);
        link.addEventListener('mouseleave', animateit);
      });

      window.addEventListener('mousemove', editCursor);
    }
  }
}
