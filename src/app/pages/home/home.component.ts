import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollToPlugin } from 'gsap/all';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);

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
      const cursor: HTMLElement | null = document.getElementById("cursor");
      const inner: HTMLElement | null = document.querySelector(".inner");

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

      if (cursor && inner) {
      const innerX = gsap.quickTo(inner, "x", {
        duration: 0.65,
        ease: "power4"
      });
      const innerY = gsap.quickTo(inner, "y", {
        duration: 0.65,
        ease: "power4"
      });
    
      const xCursorTo = gsap.quickTo(cursor, "x", {
        duration: 0.5,
        ease: "power4"
      });
      const yCursorTo = gsap.quickTo(cursor, "y", {
        duration: 0.5,
        ease: "power4"
      });
    
      document.addEventListener("mousemove", (e: MouseEvent) => {
        xCursorTo(e.clientX);
        yCursorTo(e.clientY);
        innerX(e.clientX);
        innerY(e.clientY);
      });
      }
// Configuraciones para pantallas grandes
const largeScreenConfig = () => {
  gsap.set('#thePoint', { rotation: -37, transformOrigin: 'center' });

  const scrollDist = 15;
  gsap.set('#scrollDist', {
    width: '100%',
    height: () => window.innerHeight * (scrollDist + 3),
  });

  const map = document.getElementById('map')!;
  const mapWidth = map.getBoundingClientRect().width;
  const mapHeight = map.getBoundingClientRect().height;

  gsap.set('#container', {
    position: 'fixed',
    width: mapWidth,
    height: mapHeight,
    left: '50%',
    xPercent: -50,
    top: 0,
    autoAlpha: 1,
  });

  const staggerTimes = [0.095, 0.105, 0.120, 0.130, 0.160, 0.180, 0.200];

  gsap.timeline({
    defaults: { duration: 0.3, ease: 'none' },
    onComplete: final,
    scrollTrigger: {
      trigger: '#scrollDist',
      start: 'top top',
      end: () => window.innerHeight * scrollDist,
      scrub: 1,
      onUpdate: ({ progress }) => {
        console.log(progress);
      },
    },
  })
    .to('#thePoint', {
      motionPath: {
        path: "#theRoute",
        align: "#theRoute",
        alignOrigin: [0.5, 0.5],
        autoRotate: -90,
      },
    }, 0)
    .from('#theRoute', { strokeDasharray: '0 100%' }, 0)
    .from('.stop', {
      autoAlpha: 0,
      y: '-=100',
      duration: 0.005,
      stagger: (index: number) => staggerTimes[index],
    }, 0);

  function final() {
    gsap.to('.last', { scale: 2, duration: 0.2, repeat: 1, yoyo: true });
  }

  let povDelay = 1;
  let pos = { x: -mapWidth / 2, y: -mapHeight / 2 };
  const xSet = gsap.quickSetter('#container', "x", "px");
  const ySet = gsap.quickSetter('#container', "y", "px");

  gsap.ticker.add(() => {
    pos.x += (-gsap.getProperty('#thePoint', 'x') as number - pos.x) * povDelay;
    pos.y += (-gsap.getProperty('#thePoint', 'y') as number - pos.y) * povDelay;
    xSet(pos.x);
    ySet(pos.y);
  });

  window.onresize = () => {
    gsap.set('#scrollDist', {
      width: '100%',
      height: () => window.innerHeight * (scrollDist + 3),
    });
  };
};

// Configuraciones para pantallas pequeñas
const smallScreenConfig = () => {
  gsap.set('#thePoint', { rotation: -37, transformOrigin: 'center' });

  const scrollDist = 17.5; // Ajusta según sea necesario
  gsap.set('#scrollDist', {
    width: '100%',
    height: () => window.innerHeight * (scrollDist + 2),
  });

  const map = document.getElementById('map')!;
  const mapWidth = map.getBoundingClientRect().width;
  const mapHeight = map.getBoundingClientRect().height;

  gsap.set('#container', {
    position: 'fixed',
    width: mapWidth,
    height: mapHeight,
    left: '50%',
    xPercent: -50,
    top: 0,
    autoAlpha: 1,
  });

  const staggerTimes = [0.095, 0.105, 0.120, 0.130, 0.160, 0.180, 0.200];

  gsap.timeline({
    defaults: { duration: 0.3, ease: 'none' },
    onComplete: final,
    scrollTrigger: {
      trigger: '#scrollDist',
      start: 'top top',
      end: () => window.innerHeight * scrollDist,
      scrub: 1,
      onUpdate: ({ progress }) => {
        console.log(progress);
      },
    },
  })
    .to('#thePoint', {
      motionPath: {
        path: "#theRoute",
        align: "#theRoute",
        alignOrigin: [0.5, 0.5],
        autoRotate: -90,
      },
    }, 0)
    .from('#theRoute', { strokeDasharray: '0 100%' }, 0)
    .from('.stop', {
      autoAlpha: 0,
      y: '-=100',
      duration: 0.005,
      stagger: (index: number) => staggerTimes[index],
    }, 0);

  function final() {
    gsap.to('.last', { scale: 2, duration: 0.2, repeat: 1, yoyo: true });
  }

  let povDelay = 1;
  let pos = { x: -mapWidth / 2, y: -mapHeight / 2 };
  const xSet = gsap.quickSetter('#container', "x", "px");
  const ySet = gsap.quickSetter('#container', "y", "px");

  gsap.ticker.add(() => {
    pos.x += (-gsap.getProperty('#thePoint', 'x') as number - pos.x) * povDelay;
    pos.y += (-gsap.getProperty('#thePoint', 'y') as number - pos.y) * povDelay;
    xSet(pos.x);
    ySet(pos.y);
  });

  window.onresize = () => {
    gsap.set('#scrollDist', {
      width: '100%',
      height: () => window.innerHeight * (scrollDist + 2),
    });
  };
};

const updateXValue = () => {
  const textElement = document.querySelector('.stop.last') as HTMLElement;
  if (window.innerWidth < 1300) {
    textElement.setAttribute('x', '520');
  } else {
    textElement.setAttribute('x', '820'); // Valor original o el que desees para resoluciones mayores
  }
};

// Detectar el tamaño de la pantalla y aplicar la configuración correspondiente
const mediaQuery = window.matchMedia('(max-width: 1300px)'); 

const applyConfig = (e: MediaQueryList | MediaQueryListEvent) => {
  if (e.matches) {
    smallScreenConfig();
  } else {
    largeScreenConfig();
  }
};

applyConfig(mediaQuery);

mediaQuery.addEventListener('change', applyConfig);

window.addEventListener('load', updateXValue);


            // first card stack
            const stack = document.querySelector(".stack") as HTMLElement;
            const cards = Array.from(stack.children)
              .reverse()
              .filter((child) => (child as HTMLElement).classList.contains("card"));
            
            cards.forEach((card) => stack.appendChild(card));
            
            function moveCard() {
              const lastCard = stack.lastElementChild as HTMLElement;
              if (lastCard.classList.contains("card")) {
                lastCard.classList.add("swap");
            
                setTimeout(() => {
                  lastCard.classList.remove("swap");
                  stack.insertBefore(lastCard, stack.firstElementChild);
                }, 1200);
              }
            }
            
            let autoplayInterval = setInterval(moveCard, 4000);
            
            stack.addEventListener("click", function (e) {
              const card = (e.target as HTMLElement).closest(".card") as HTMLElement;
              if (card && card === stack.lastElementChild) {
                card.classList.add("swap");
            
                setTimeout(() => {
                  card.classList.remove("swap");
                  stack.insertBefore(card, stack.firstElementChild);
                }, 1200);
              }
            }); 

          // second card stack
          const stack2 = document.querySelector(".stack2") as HTMLElement;
          const cards2 = Array.from(stack.children)
            .reverse()
            .filter((child) => (child as HTMLElement).classList.contains("card2"));
          
          cards2.forEach((card2) => stack2.appendChild(card2));
          
          function moveCard2() {
            const lastCard = stack2.lastElementChild as HTMLElement;
            if (lastCard.classList.contains("card2")) {
              lastCard.classList.add("swap");
          
              setTimeout(() => {
                lastCard.classList.remove("swap");
                stack2.insertBefore(lastCard, stack2.firstElementChild);
              }, 1200);
            }
          }
          
          let autoplayInterval2 = setInterval(moveCard2, 4000);
          
          stack2.addEventListener("click", function (e) {
            const card2 = (e.target as HTMLElement).closest(".card2") as HTMLElement;
            if (card2 && card2 === stack2.lastElementChild) {
              card2.classList.add("swap");
          
              setTimeout(() => {
                card2.classList.remove("swap");
                stack2.insertBefore(card2, stack2.firstElementChild);
              }, 1200);
            }
          });    

          const ambulancia = document.getElementById('ambulancia');
          if (ambulancia) {
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  gsap.fromTo(ambulancia, 
                    { x: '-100%' }, 
                    { 
                      x: '350%', 
                      duration: 5 // Ajusta la duración según sea necesario
                    }
                  );
                  observer.unobserve(ambulancia); // Deja de observar una vez que la animación ha comenzado
                }
              });
            }, { threshold: 0.1 }); // Ajusta el umbral según sea necesario
          
            observer.observe(ambulancia);
          }
    }
  }
}