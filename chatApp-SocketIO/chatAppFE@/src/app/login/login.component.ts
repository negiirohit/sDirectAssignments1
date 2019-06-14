import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service'
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  userLoginForm : FormGroup
  loginError : string;
  constructor(private fb: FormBuilder,  private authService : AuthService, private router : Router, private socketService : SocketService) {
  }
    
  
  ngOnInit() {
    this.createLoginForm();    
  }
  
  
  createLoginForm(){
    this.userLoginForm = this.fb.group({
      email : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      password : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
    })

    this.userLoginForm.valueChanges
    .subscribe( data=> {
        this.loginError='';
    })
  }
  

  loginUser() {
    this.loginError = "";
    let user = this.userLoginForm.value;
    this.authService.loginUser(user)
    .subscribe(
       res => {
         if(res.success){
          console.log('login success');
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('user',res.data.user.name);
          localStorage.setItem('id',res.data.user._id);    
          this.socketService.goOnline();      
          this.router.navigate(['/user/userlist']);
         }
         if(res.success===false){
           this.loginError = res.message; 
         }
    },
    err => console.log(err))
  }

}
