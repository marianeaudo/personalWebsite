import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Skill } from '../shared/cv.model';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  fbSubscription: Subscription;
  isLoading = true;
  isLoadingSubject = new Subject<boolean>();
  skillSubject = new Subject<Skill[]>();
  skills: Skill[] = [];
  skillCategories = ['Back-end', 'Front-end', 'Divers'];

  constructor(private db: AngularFirestore, private uIService: UIService) {}

  fetchSkills() {
    this.fbSubscription = this.db
      .collection('skills')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              ...(doc.payload.doc.data() as Skill),
            };
          });
        })
      )
      .subscribe(
        (skills: Skill[]) => {
          this.skills = skills;
          this.isLoading = false;
          this.isLoadingSubject.next(this.isLoading);
          this.skillSubject.next([...this.skills].sort((a, b) => a.rank - b.rank
          ));
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

  getSkillCategories() {
    return [...this.skillCategories];
  }
}
