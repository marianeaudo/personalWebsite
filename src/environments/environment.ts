import { firebase } from './firebase.environment';

export const environment = {
    production: true,
    firebase : {
      apiKey: firebase.apiKey,
      authDomain: firebase.authDomain,
      databaseURL: firebase.databaseURL,
      projectId: firebase.projectId,
      storageBucket: firebase.storageBucket,
      messagingSenderId: firebase.messagingSenderId,
      appId: firebase.appId
    },
    name: 'personal-website',
    version: '0.0.0'
};
