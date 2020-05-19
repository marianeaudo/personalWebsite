import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExperiencesService } from './experiences.service';
import { Experience } from '../shared/cv.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit, OnDestroy {

  experiences: Experience[] = [];
  experiencesSubscription: Subscription;
  isLoading = true;
  isLoadingSubscription: Subscription;

  constructor(private experiencesService: ExperiencesService) { }

  ngOnInit(): void {
    this.experiencesSubscription = this.experiencesService.experiencesSubject.subscribe((experiences: Experience[]) => {
      this.experiences = experiences;
    });
    this.isLoadingSubscription = this.experiencesService.isLoadingSubject.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });

    this.experiencesService.fetchExperiences();
  }

  ngOnDestroy() {
    this.experiencesSubscription.unsubscribe();
    this.isLoadingSubscription.unsubscribe();
  }

}
