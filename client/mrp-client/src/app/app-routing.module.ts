import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimsFormComponent } from './main/claims-form/claims-form.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { PortalLoginComponent } from './main/portal-login/portal-login.component';
import { PortalRegistrationComponent } from './main/portal-registration/portal-registration.component';
import { AuthGuardService } from './main/service/authentication/auth-guard.service';
import { UpdateMemberComponent } from './main/update-member/update-member.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-up', component: PortalRegistrationComponent},
  { path: 'sign-in', component: PortalLoginComponent},
  { path: 'submit-claims', component: ClaimsFormComponent, canActivate: [AuthGuardService]},
  { path: 'profile', component: UpdateMemberComponent, canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
