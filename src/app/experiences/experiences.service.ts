import { Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { Experience } from '../shared/cv.model';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root',
})
export class ExperiencesService {
  experiences: Experience[] = [];
  fbSubscription: Subscription;
  experiencesSubject = new Subject<Experience[]>();
  isLoading = true;
  isLoadingSubject = new Subject<boolean>();
  errorSubject = new Subject<string>();

  constructor(private db: AngularFirestore, private uIService: UIService) {}

  fetchExperiences() {
    this.fbSubscription = this.db
      .collection('experiences')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              ...(doc.payload.doc.data() as Experience),
            };
          });
        })
      )
      .subscribe(
        (experiences: Experience[]) => {
          this.experiences = experiences;
          this.experiencesSubject.next(
            [...this.experiences].sort((a, b) => {
              return (b.beginningDate as any) - (a.beginningDate as any);
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
