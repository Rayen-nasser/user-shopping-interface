import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormControlName, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/components/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  darkMode: boolean = false;
  searchActive: boolean = false;
  navActive: boolean = false;
  token: string | null = null;
  cancel!: boolean
  @Output()keywordValue = new EventEmitter()



  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.checkToken();
    const getMode = localStorage.getItem('mode');
    if (getMode && getMode === 'dark-mode') {
      this.darkMode = true;
    }
  }

  detectChanges(event: any){
    this.keywordValue.emit(event)
  }


  checkToken(): void {
    const storedToken = localStorage.getItem('token');
    this.token = storedToken ? storedToken : null;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token = null;
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('mode', this.darkMode ? 'dark-mode' : 'light-mode');
  }

  toggleSearch(): void {
    this.searchActive = !this.searchActive
  }

  toggleNav(): void {
    this.navActive = !this.navActive;
  }

  @HostListener('document:click', ['$event'])
  clickOutsideNav(event: Event): void {
    const clickedElm = event.target as HTMLElement;
    if (!clickedElm.classList.contains('sidebarOpen') && !clickedElm.classList.contains('menu')) {
      this.navActive = false;
    }
  }

}
