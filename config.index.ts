import {writeFile} from 'fs';

const targetPath = './src/environments/environment.prod.ts';
const targetPath2 = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
   production: true,
   firebase: {
        apiKey: '${process.env.FIREBASE_API_KEY}',
        authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
        databaseURL: '${process.env.FIREBASE_DATABASE_URL}',
        projectId: '${process.env.FIREBASE_PROJECT_ID}',
        storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
        messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
        appId: '${process.env.FIREBASE_APP_ID}'
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

writeFile(targetPath2, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
