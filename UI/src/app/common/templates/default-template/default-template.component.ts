import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { LoginPopupComponent } from '../../../shared/login-popup/login-popup.component';
import { UserService } from '../../api/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-template',
  templateUrl: './default-template.component.html',
  styleUrls: ['./default-template.component.scss']
})
export class DefaultTemplateComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private router: Router,
    public userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const user = localStorage.getItem('user');
    user && this.userService.GetUser(JSON.parse(user));
  }

  login() {
    this.dialog.open(LoginPopupComponent, {
      width: '400px',
      disableClose: true,
    });
  }

  logout() {
    if (this.router.url === '/user') {
      this.router.navigate(['/']);
    }
    localStorage.removeItem('user');
    this.userService.setCurrentUser(null);
  }

}
