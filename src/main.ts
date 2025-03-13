import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';

bootstrapApplication(AppComponent, {
  providers: [

    importProvidersFrom(BrowserModule, HttpClientModule, NgxEchartsModule),
    { provide: NGX_ECHARTS_CONFIG, useValue: { echarts: () => import('echarts') } },
    provideRouter(routes)
  ]
}).catch(err => console.error(err));