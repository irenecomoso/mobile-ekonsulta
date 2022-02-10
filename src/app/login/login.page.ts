/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/semi */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password: '';
  message: string;
  errorMessage: string;
  error: {name: string; message: string} = {name: '',message: ''};
  emailCheck: boolean = false;

  constructor(private authservice: AuthService,private router: Router, public userservice: UserService) { }

  ngOnInit(): void {
  }
  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name: '', message: ''};
  }
  login(){
    if(this.validateForm(this.email,this.password))
    {
      this.authservice.get_userData().then(e => {
        e.forEach(res => {
          if(res.data().email == this.email) // finding equal email from the firestore
            {
              this.errorMessage = "";
              if(res.data().role == 'doctor') //finding user Role
              {
                if(res.data().disabled != 'true')// checks if the account is disabled or not
                  {
                    this.authservice.loginWithEmail(this.email, this.password,res.data().role).catch(_error => {
                      this.error = _error
                      this.router.navigate(['/login'])
                    })
                  }
                  else //if the account is disabled
                  {
                    this.errorMessage = "Account is disabled!";
                    console.log('Account Disabled!');
                  }
              }
              else if(res.data().role == "patient")
              {
                if(res.data().disabled!='true')// checks if the account is disabled or not
                {
                  this.authservice.loginWithEmail(this.email, this.password,res.data().role).catch(_error => {
                    this.error = _error
                    this.router.navigate(['/login'])
                  })
                }
                else //if the account is disabled
                {
                  this.errorMessage = "Account is disabled!";
                  console.log('Account Disabled!');
                }
              }
              else if(res.data().role == "Health_Insurance")
              {
                this.userservice.get_HealthInsurance_Info(res.id).then(e=>{
                  if(e.data().disabled != 'true')
                  {
                    this.authservice.loginWithEmail(this.email, this.password,res.data().role).catch(_error => {
                      this.error = _error
                      this.router.navigate(['/login'])
                    })
                  }
                  else
                  {
                    this.errorMessage = "Account is disabled!";
                    console.log('Account Disabled!');
                  }
                })
              }
            }
            else
            {
              this.emailCheck = true;
            }
        })
      })
      if(this.emailCheck === true)
        this.errorMessage = "This email is not registered!";
    }
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
