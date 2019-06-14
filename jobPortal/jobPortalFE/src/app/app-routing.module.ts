import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/job-seeker/login/login.component';
import { RegistrationComponent } from 'src/app/job-seeker/registration/registration.component';
import { JobSeekerProfileComponent } from 'src/app/job-seeker/job-seeker-profile/job-seeker-profile.component'
import { JPRegistrationComponent } from 'src/app/job-provider/registration/registration.component';
import { CompanyProfileComponent } from 'src/app/job-provider/company-profile/company-profile.component'
import { CreateJobComponent } from 'src/app/job-provider/create-job/create-job.component';
import { LoginProviderComponent } from 'src/app/job-provider/login-provider/login-provider.component'
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { AppComponent } from 'src/app/app.component';
import { JobComponent } from 'src/app/job/job.component';
import { CompanyComponent } from 'src/app/company/company.component';
import { JobDetailComponent } from 'src/app/job-detail/job-detail.component';
import { CompanyDetailComponent } from 'src/app/company-detail/company-detail.component';
import { CreateProfileComponent } from 'src/app/job-seeker/create-profile/create-profile.component';
import { CompanyJobDetailComponent } from 'src/app/job-provider/company-job-detail/company-job-detail.component';
 const routes: Routes = [
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path:'register',
    component : RegistrationComponent
  },
  {
    path:'seeker/seekerProfile',
    component : JobSeekerProfileComponent
  },
  {
    path:'createSeekerProfile',
    component : CreateProfileComponent
  },
  {
    path:'company/regiser',
    component : JPRegistrationComponent
  },
  {
    path:'company/profile',
    component : CompanyProfileComponent
  },
  {
    path:'company/createJob',
    component:  CreateJobComponent
  },
  {
    path:'company/login',
    component: LoginProviderComponent
  },
  {
    path:'company/jobDetails',
    component : CompanyJobDetailComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },{
    path:'',
    component: DashboardComponent
  },{
    path:'jobs',
    component: JobComponent
  },{
    path:'companies',
    component: CompanyComponent
  },{
    path:'jobDetail',
    component : JobDetailComponent
  },{
    path:'companyDetail',
    component : CompanyDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
