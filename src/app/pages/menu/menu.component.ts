import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    if (typeof document !== 'undefined') {
      const links = document.querySelectorAll('nav > .hover-this');
      const cursor = document.querySelector('.cursor') as HTMLElement;

      const animateit: EventListener = function (this: HTMLElement, e: Event) {
        const event = e as MouseEvent;
        const span = this.querySelector('span') as HTMLElement;
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

