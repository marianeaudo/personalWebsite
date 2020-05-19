import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Header } from './application.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  headers: Header[] = [
    { title: 'Accueil', route: '/', icon: 'home' },
    { title: 'À propos', route: '/apropos', icon: 'sentiment_satisfied' },
    { title: 'Formation', route: '/formation', icon: 'school' },
    { title: 'Expériences', route: '/experiences', icon: 'card_travel' },
    { title: 'Compétences', route: '/competences', icon: 'computer' },
    { title: 'Contact', route: '/contact', icon: 'contacts' },
  ];

  private selectedHeader: Header;
  selectedHeaderSubject = new Subject<Header>();

  getHeaders() {
    return [...this.headers];
  }

  setSelectedHeader(header: Header) {
    this.selectedHeader = header;
    this.selectedHeaderSubject.next({ ...this.selectedHeader });
  }
}
