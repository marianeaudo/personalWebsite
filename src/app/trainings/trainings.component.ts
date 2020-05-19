import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TrainingsService } from './trainings.service';
import { Training } from '../shared/cv.model';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit, OnDestroy {

  trainings: Training[] = [];
  trainingsSubscription: Subscription;
  isLoading = true;
  isLoadingSubscription: Subscription;

  constructor(private trainingService: TrainingsService) { }

  ngOnInit(): void {
    this.isLoadingSubscription = this.trainingService.isLoadingSubject.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.trainingService.fetchTrainings();
    this.trainingsSubscription = this.trainingService.trainingsSubject.subscribe((trainings: Training[]) => {
      this.trainings = trainings;
    });
  }

  ngOnDestroy() {
    this.trainingsSubscription.unsubscribe();
    this.isLoadingSubscription.unsubscribe();
  }

}
