import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"test-database-89a7c","appId":"1:1026880838806:web:74261022573925271e36b7","storageBucket":"test-database-89a7c.appspot.com","apiKey":"AIzaSyBzQ8ePS6ZPrLP7z0P8AJVHxYElWzyBi9E","authDomain":"test-database-89a7c.firebaseapp.com","messagingSenderId":"1026880838806","measurementId":"G-4N639BPKPF"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
