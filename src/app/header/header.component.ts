import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authS: AutenticacionService,private router:Router) { }

  ngOnInit(): void {
    this.authS.$ready?.subscribe((data)=>{
      if (data) {
        this.router.navigate(['/inicio']);
      }
    })
  }
  isAuth() {
    return this.authS.isLogged;
  }
  async onLogout() {
    await this.authS.logout();
    this.router.navigate(['/inicio'])
    }
}
