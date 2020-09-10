import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import {Router} from "@angular/router";

import { UIService } from '../shared/ui.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  firebaseSubscription: Subscription;
  messageSent = false;
  errorMessageSent = false;

  constructor(private httpClient: HttpClient, private uiService: UIService, private router: Router) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      phonenumber: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    const date = new Date();
    const message = {
      ...this.contactForm.value,
      date,
    };

    this.httpClient
      .post('https://marianeaudo-website.firebaseio.com/messages.json', message)
      .subscribe(
        () => {
          this.messageSent = true;
          this.uiService.showSnackbar('Votre message a bien été envoyé.');
          this.router.navigate(['']);
        },
        (error) => {
          this.errorMessageSent = true;
          this.uiService.showSnackbar('Un problème est survenu lors de l\'envoi de votre message, veuillez réessayer.');
          this.router.navigate(['/contact']);

        }
      );
  }

  ngOnDestroy() {
    if (this.firebaseSubscription) {
      this.firebaseSubscription.unsubscribe();
    }
  }
}
