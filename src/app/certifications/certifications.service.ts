import { Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { Certification } from '../shared/cv.model';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root',
})
export class CertificationsService {
  certifications: Certification[] = [];
  fbSubscription: Subscription;
  certificationsSubject = new Subject<Certification[]>();
  isLoading = true;
  isLoadingSubject = new Subject<boolean>();
  errorSubject = new Subject<string>();

  constructor(private db: AngularFirestore, private uIService: UIService) {}

  fetchCertifications() {
    this.fbSubscription = this.db
      .collection('certifications')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              ...(doc.payload.doc.data() as Certification),
            };
          });
        })
      )
      .subscribe(
        (certifications: Certification[]) => {
          this.certifications = certifications;
          this.certificationsSubject.next(
            [...this.certifications].sort((a, b) => {
              return (b.date as any) - (a.date as any);
            })
          );
          this.isLoading = false;
          this.isLoadingSubject.next(this.isLoading);
        },
        (error) => {
          this.isLoading = false;
          this.isLoadingSubject.next(this.isLoading);
          this.uIService.showSnackbar(
            'Une erreur est survenue, veuillez réessayer.'
          );
        }
      );
  }

}
