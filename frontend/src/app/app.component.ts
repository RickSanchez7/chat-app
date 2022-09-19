import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chat-room';
  constructor(private authService: AuthService) {}
  getProfile() {
    this.authService.getProfile().subscribe((val) => {
      console.log('profile', val);
    });
  }
}
