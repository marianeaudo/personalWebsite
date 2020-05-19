import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Training } from '../shared/cv.model';
import { UIService } from '../shared/ui.service';

@Injectable({ providedIn: 'root' })
export class TrainingsService {
  trainings: Training[] = [];
  fbSubscription: Subscription;
  trainingsSubject = new Subject<Training[]>();
  isLoading = true;
  isLoadingSubject = new Subject<boolean>();
  errorSubject = new Subject<string>();

  constructor(private db: AngularFirestore, private uIService: UIService) {}

  fetchTrainings() {
      this.fbSubscription = this.db
        .collection('trainings')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((doc) => {
              return {
                ...(doc.payload.doc.data() as Training),
              };
            });
          })
        )
        .subscribe((trainings: Training[]) => {
          this.trainings = trainings;
          this.trainingsSubject.next([...this.trainings]
          .sort((a, b) => {
            return (b.beginningDate as any) - (a.beginningDate as any);
          })
          );
          this.isLoading = false;
          this.isLoadingSubject.next(this.isLoading);
        }, error => {
          this.isLoading = false;
          this.isLoadingSubject.next(this.isLoading);
          this.uIService.showSnackbar('Une erreur est survenue, veuillez réessayer.');
        }
        )
    ;

  }

}
