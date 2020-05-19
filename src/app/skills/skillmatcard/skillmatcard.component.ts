import { Component, OnInit, Input } from '@angular/core';

import { Skill } from 'src/app/shared/cv.model';

@Component({
  selector: 'app-skillmatcard',
  templateUrl: './skillmatcard.component.html',
  styleUrls: ['./skillmatcard.component.css']
})
export class SkillmatcardComponent implements OnInit {

  @Input() skill: Skill;

  ngOnInit(): void {
  }

}
