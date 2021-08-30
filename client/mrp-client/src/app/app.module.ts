import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { PortalRegistrationComponent } from './main/portal-registration/portal-registration.component';
import { PortalLoginComponent } from './main/portal-login/portal-login.component';
import { ClaimsFormComponent } from './main/claims-form/claims-form.component';
import { UpdateMemberComponent } from './main/update-member/update-member.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './main/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PortalRegistrationComponent,
    PortalLoginComponent,
    ClaimsFormComponent,
    UpdateMemberComponent,
    PageNotFoundComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
