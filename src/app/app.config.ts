import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { TeslaService } from './services/tesla.service';
import { FindModelService } from './services/find-model.service';

export const appConfig: ApplicationConfig = {
  providers: [
    UserService,
    TeslaService,
    FindModelService,
    provideRouter(routes),
    importProvidersFrom([
      HttpClientModule,
    ])
  ]
};
