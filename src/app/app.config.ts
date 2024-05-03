import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from 'src/environments/environment';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideAnimationsAsync(),
  importProvidersFrom(
    provideFirebaseApp(() => initializeApp(environment.firebase))),
  importProvidersFrom(provideFirestore(() => getFirestore())),
  { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
};
