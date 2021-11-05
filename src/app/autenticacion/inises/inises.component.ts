import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-inises',
  templateUrl: './inises.component.html',
  styleUrls: ['./inises.component.css']
})
export class InisesComponent implements OnInit {
  loginForm: FormGroup | any;
  userdata: any;
  mensaje: boolean=false;

  constructor(private formBuilder: FormBuilder,
    public authS: AutenticacionService,
    private router: Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]]
    });
 
  }
  login(){
    this.authS.googleLogin()
    .then((data)=>{
      this.authS.setUser(data);
      if(this.authS.isLogged){
        this.router.navigate(['/inicio']);
      }
    })
    .catch((data)=>{
      console.log(data);
    })
  }
  onSubmit() {
    this.userdata = this.saveUserdata();
    this.authS.inicioSesion(this.userdata)
    .then(data => {
      this.authS.setUser(data);
      this.router.navigate(['/inicio']);
    })
    .catch(
      error => {
        console.log(error);
      }
    );

    setTimeout(() => {
      if (this.authS.isLogged === false) {
      this.mensaje = true
      }
      }, 2000);
  }
  saveUserdata() {
    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    return saveUserdata;
  }

}
