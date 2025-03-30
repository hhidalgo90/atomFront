import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideToastr } from "ngx-toastr";

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideAnimationsAsync(), provideAnimations(), provideToastr(), ]
};


