import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Router } from  '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router) { }
  

  checkLogin(){
    if(this.loggedIn()){
      if(this.checkUserType()=='Company')
          this.router.navigate(['company/companyProfile'])
      else  
      this.router.navigate(['seeker/seekerProfile'])
    }
    return;
  }

  registerSeeker(user){
    console.log("registering job seeker: "+user)
    return this.http.post<any>(baseURL+'/seeker/register',user);
  }

  registerCompany(user) {
    return this.http.post<any>(baseURL+'/companies/register',user);
  }

  loginSeeker(user) {
    this.http.post<any>(baseURL+'/seeker/login',user)
    .subscribe(
      res => {
        if(res.success)
        {
          console.log('login success');
          console.log(JSON.stringify(res));
          localStorage.setItem('token',res.token);
          localStorage.setItem('userType','JobSeeker');
          if(localStorage.getItem('newUser'))
          {
            localStorage.removeItem('newUser');
            this.router.navigate(['/createSeekerProfile']);  
             
          }
          else if(localStorage.getItem('refURL')) {
             let url = localStorage.getItem('refURL');
             localStorage.removeItem('refURL');
             this.router.navigateByUrl(url);
          }
          else 
               this.router.navigate(['seeker/seekerProfile']); 
         }
         else{
            console.log('login failed');
            console.log(JSON.stringify(res));
          }

       },
      err => console.log(err)
    )
  }

  loginCompany(user) {
    console.log("login user: "+JSON.stringify(user));
    this.http.post<any>(baseURL+'/companies/login',user)
    .subscribe(
      res => {
       if(res.success)
       {
        console.log(JSON.stringify(res));
        localStorage.setItem('token',res.token);
        localStorage.setItem('userType','Company');
        this.router.navigate(['/company/profile']);
       }
       else 
       {
         console.log(res);
       } 
       },
      err => console.log(err)
    )
  }

  loggedIn()
  {
    return !!localStorage.getItem('token')
  }

  logOutUser()
  {
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  checkUserType(): String{

    //Check for token if not token return
    if(!localStorage.getItem('token'))
      return;
    let userType = localStorage.getItem('userType');
    if(userType=='Company') 
      return 'Company'; 
    if(userType=='JobSeeker') 
      return 'JobSeeker'

    return;
  }

  isAuthenticated() {
    // get the auth token from localStorage
    let token = localStorage.getItem('token');

    // check if token is set, then...
    if (token) {
        return true;
    }

    return false;
}
}