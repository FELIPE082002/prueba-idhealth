import { Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  [x: string]: any;
  data: string = '';
  error: Array<any> = [];
  errors: Array<string> = [];

  constructor(
    private router: Router,
    private loginService: LoginService,
    private homeService: HomeService
  ) {}

  userForm = new FormGroup({
    email: new FormControl(),
    pass: new FormControl(),
  });

  onSubmit(email: string, pass: string) {
    email = this.userForm.value.email;
    pass = this.userForm.value.pass;

    const user = { correo: email, password: pass };

    this.loginService.login(user).subscribe(
      (data) => {
        this.loginService.setToken(data.token)
        this.loginService.disparadorLogin.emit(data);
        this.router.navigate(['/home']);
      },
      (err) => {
        this.error = err.error.errors;

        this.error.forEach((err) => {
          alert(err.msg);
        });
      }
    );
  }

  ngOnInit(){
    localStorage.clear()
  }

}
