import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD6Qkvor66wxiR2W86ESpgwfiARHLLOSB8',
  authDomain: 'my-little-library-799e3.firebaseapp.com',
  databaseURL: 'https://my-little-library-799e3-default-rtdb.firebaseio.com',
  projectId: 'my-little-library-799e3',
  storageBucket: 'my-little-library-799e3.appspot.com',
  messagingSenderId: '227149753810',
  appId: '1:227149753810:web:e817518c0bcd5404de2c0b',
  measurementId: 'G-G7NJ2XEW77',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
    ]),
  ],
};

// import {provideFirebaseApp, initializeApp} from '@angular/fire/app'
// import {getFirestore, provideFirestore} from '@angular/fire/firestore'

// const firebaseConfig = {
//   apiKey: "AIzaSyD6Qkvor66wxiR2W86ESpgwfiARHLLOSB8",
//   authDomain: "my-little-library-799e3.firebaseapp.com",
//   databaseURL: "https://my-little-library-799e3-default-rtdb.firebaseio.com",
//   projectId: "my-little-library-799e3",
//   storageBucket: "my-little-library-799e3.appspot.com",
//   messagingSenderId: "227149753810",
//   appId: "1:227149753810:web:e817518c0bcd5404de2c0b",
//   measurementId: "G-G7NJ2XEW77"
// };

// importProvidersFrom([
//   provideFirebaseApp(() => initializeApp(firebaseConfig)),
//   provideFirestore(() => getFirestore())
// ])
