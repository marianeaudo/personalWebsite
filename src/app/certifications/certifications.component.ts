import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Certification } from '../shared/cv.model';
import { CertificationsService } from './certifications.service';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css'],
})
export class CertificationsComponent implements OnInit, OnDestroy {
  certifications: Certification[] = [];
  certificationsSubscription: Subscription;
  isLoading = true;
  isLoadingSubscription: Subscription;

  constructor(private certificationsService: CertificationsService) {}

  ngOnInit(): void {
    this.certificationsSubscription = this.certificationsService.certificationsSubject.subscribe(
      (certifications: Certification[]) => {
        this.certifications = certifications;
      }
    );
    this.isLoadingSubscription = this.certificationsService.isLoadingSubject.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    );
    this.certificationsService.fetchCertifications();
  }

  ngOnDestroy(): void {
    this.certificationsSubscription.unsubscribe();
    this.isLoadingSubscription.unsubscribe();
  }
}
