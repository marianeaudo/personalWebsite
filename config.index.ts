import { writeFile } from 'fs';

// read environment variables from .env file
require('dotenv').config();

const targetPath = './src/environments/environment.prod.ts';
const targetPath2 = './src/environments/environment.ts';

const envConfigFile = `export const environment = {
   production: true,
   firebase: {
        apiKey: '${process.env.API_KEY}',
        authDomain: '${process.env.FAUTH_DOMAIN}',
        databaseURL: '${process.env.DATABASE_URL}',
        projectId: '${process.env.PROJECT_ID}',
        storageBucket: '${process.env.STORAGE_BUCKET}',
        messagingSenderId: '${process.env.MESSAGING_SENDER_ID}',
        appId: '${process.env.APP_ID}'
    },
    name: 'personal-website',
    version: '0.0.0'
};
`;

const envConfigFile2 = `export const environment = {
  production: false,
  firebase: {
       apiKey: '${process.env.API_KEY}',
       authDomain: '${process.env.FAUTH_DOMAIN}',
       databaseURL: '${process.env.DATABASE_URL}',
       projectId: '${process.env.PROJECT_ID}',
       storageBucket: '${process.env.STORAGE_BUCKET}',
       messagingSenderId: '${process.env.MESSAGING_SENDER_ID}',
       appId: '${process.env.APP_ID}'
   },
   name: 'personal-website',
   version: '0.0.0'
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});

writeFile(targetPath2, envConfigFile2, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
