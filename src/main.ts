import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';  // A nova abordagem standalone
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  // Usar provideHttpClient no lugar de HttpClientModule
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
