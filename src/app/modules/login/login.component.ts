import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { showAlert } from '../../components/dialog/dialog';
import { HttpClientModule } from '@angular/common/http';
import { spinner } from '../../components/spinner/spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, RouterModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private router: Router, private loginService: LoginService, @Inject(ToastrService) private toastr: ToastrService) { }


  login() {
    spinner();
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      return
    }
    let email = this.loginForm.get("email")?.value!;
    this.loginService.existUser(email).then((response) => {
      console.log(response);
      if (response) {
        sessionStorage.setItem('email', email);
        this.router.navigate(['/tasks'], { queryParams: { email: email } });
        Swal.close();
      } else {
        showAlert().then((result: any) => {
          if (result.isConfirmed) {
            this.loginService.createUser(email).then((response) => {
              console.log(response);
              if (response) {
                sessionStorage.setItem('email', email);
                Swal.close();
                sessionStorage.setItem('email', email);
                Swal.fire({
                  title: "Yes!",
                  text: "User has been created.",
                  icon: "success"
                });
                setTimeout(() => {
                  Swal.close();
                  this.router.navigate(['/tasks'], { queryParams: { email: email } });
                }, 3000);
              }
            }).catch((error) => {
              Swal.close();
              console.error("Error al crear el usuario:", error);
              this.toastr.error('Error!', error.error.mensaje);
            });
          }
        })
      }
    }).catch((error) => {
      Swal.close();
      console.error("Error al verificar el usuario:", error);
      this.toastr.error('Error!', error.error.mensaje);
    }
    )
  }
}
