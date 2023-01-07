import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  public token: string = '';

  ngOnInit(): void {
    this.loginService.disparadorLogin.subscribe((data) => {
      localStorage.setItem('x-token', data.token);
    });

    this.token = JSON.stringify(localStorage.getItem('x-token'));

    if (this.token === 'null') {
      this.router.navigate(['']);
    }
  }
}
