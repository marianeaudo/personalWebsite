import { firebase } from './firebase.environment';

export const environment = {
   production: true,
   ...firebase,
    name: 'personal-website',
    version: '0.0.0'
};
