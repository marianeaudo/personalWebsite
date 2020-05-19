import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

import { ApplicationService } from 'src/app/shared/application.service';
import { Header } from 'src/app/shared/application.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  headers: Header[] = [];
  selectedHeader =  this.applicationService.getHeaders()[0];
  selectedHeaderSubscription: Subscription;
  routerSubscription: Subscription;

  constructor(
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  @Output() sidenavToggle = new EventEmitter<void>();

  ngOnInit(): void {
    this.headers = this.applicationService.getHeaders();
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.applicationService.setSelectedHeader(
          this.headers.find((header) => header.route === event['url'])
        );
      }
    });
    this.selectedHeaderSubscription = this.applicationService.selectedHeaderSubject.subscribe(
      (header: any) => {
        this.selectedHeader = header;
      }
    );
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  isSelected(header: Header) {
    if (header.title === this.selectedHeader.title) {
      return 'selected';
    }
  }

  ngOnDestroy() {
    this.selectedHeaderSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}
