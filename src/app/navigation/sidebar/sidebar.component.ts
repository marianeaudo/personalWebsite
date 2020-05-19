import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Header } from 'src/app/shared/application.model';
import { ApplicationService } from 'src/app/shared/application.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  headers: Header[] = [];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.headers = this.applicationService.getHeaders();
  }

  onToggle() {
    this.sidenavToggle.emit();
  }
}
