import {writeFile} from 'fs';

const targetPath = './src/environments/environment.prod.ts';
const targetPath2 = './src/environments/environment.prod.ts';


const envConfigFile = `export const environment = {
   production: true,
   firebase: {
        apiKey: '${process.env.FIREBASE_API_KEY}'
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
