/* eslint-disable @typescript-eslint/semi */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password: string;
  message: string;
  errorMessage: string;
  error: {name: string; message: string} = {name: '',message: ''};

  constructor(private authservice: AuthService,private router: Router) { }

  ngOnInit(): void {
  }
  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name: '', message: ''};
  }
  login(){
    this.authservice.get_userData().then(e=>{
      e.forEach(res => {
        if(res.data().email === this.email){
          this.clearErrorMessage();
          if(this.validateForm(this.email,this.password)){
            this.authservice.loginWithEmail(this.email,this.password,res.data().role).catch(_error=>{
              this.error = _error;
              this.router.navigate(['/login'])
            })
          }
        }
      });
    })
  }
  validateForm(email, password)
  {
    if(email.lenght === 0)
    {
      this.errorMessage = 'please enter email id';
      return false;
    }

    if (password.lenght === 0) {
      this.errorMessage = 'please enter password';
      return false;
    }

    this.errorMessage = '';
    return true;

  }

}
