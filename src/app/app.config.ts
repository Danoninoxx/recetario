import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp({"projectId":"recetario-a28a8","appId":"1:1098789838097:web:2e31772a79137e435d40b0","storageBucket":"recetario-a28a8.appspot.com","apiKey":"AIzaSyDikkSNhCmejNqPaNI17IyTurNd12YFm3o","authDomain":"recetario-a28a8.firebaseapp.com","messagingSenderId":"1098789838097","measurementId":"G-VG7EWL8ZNM"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())]
};
