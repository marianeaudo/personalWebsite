import { Component, OnInit, OnDestroy } from '@angular/core';
import { Skill } from '../shared/cv.model';
import { Subscription, forkJoin } from 'rxjs';
import { SkillsService } from './skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit, OnDestroy {
  isLoading = true;
  isLoadingSubscription: Subscription;
  skills: Skill[] = [];
  skillsSubscription: Subscription;
  skillCategories: string[] = [];

  constructor(private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.skillCategories = this.skillsService.getSkillCategories();
    this.isLoadingSubscription = this.skillsService.isLoadingSubject.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    );

    this.skillsSubscription = this.skillsService.skillSubject.subscribe(
      (skills: Skill[]) => {
        this.skills = skills;
      }
    );

    this.skillsService.fetchSkills();
  }

  ngOnDestroy() {
    this.isLoadingSubscription.unsubscribe();
    this.skillsSubscription.unsubscribe();
  }
}
