import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './job-seeker/registration/registration.component';
import { JPRegistrationComponent } from 'src/app/job-provider/registration/registration.component';

import { LoginComponent } from './job-seeker/login/login.component';
import { JobSeekerProfileComponent } from './job-seeker/job-seeker-profile/job-seeker-profile.component';
import { CreateJobComponent } from './job-provider/create-job/create-job.component';
import { CompanyProfileComponent } from './job-provider/company-profile/company-profile.component';
import { LoginProviderComponent } from './job-provider/login-provider/login-provider.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';
import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyComponent } from './company/company.component';
import { JobComponent } from './job/job.component';
import { FooterComponent } from './footer/footer.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CreateProfileComponent } from './job-seeker/create-profile/create-profile.component';
import { CompanyJobDetailComponent } from './job-provider/company-job-detail/company-job-detail.component';


import { FormsModule }   from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';
import { SeekerProfileComponent } from './seeker-profile/seeker-profile.component';
import { SeekerDetailComponent } from './seeker-detail/seeker-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    LoginComponent,
    JobSeekerProfileComponent,
    JPRegistrationComponent,
    CreateJobComponent,
    CompanyProfileComponent,
    LoginProviderComponent,
    DashboardComponent,
    CompanyComponent,
    JobComponent,
    FooterComponent,
    JobDetailComponent,
    CompanyDetailComponent,
    CreateProfileComponent,
    CompanyJobDetailComponent,
    SeekerProfileComponent,
    SeekerDetailComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    AuthGuardService,
    AuthService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
},
  ChatService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
