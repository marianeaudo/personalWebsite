import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingsComponent } from './trainings/trainings.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { ExperiencesComponent } from './experiences/experiences.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'formation', component: TrainingsComponent },
  { path: 'apropos', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'competences', component: SkillsComponent},
  { path: 'experiences', component: ExperiencesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
