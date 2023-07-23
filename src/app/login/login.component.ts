import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import {
  ToDoService,
  LoginDto,
  LoginViewModel
} from "../services/todo.service";
import { HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  lable = "Login";
  showLoginBtn = true;

  public get email(): FormControl {
    return this.form.get("email") as FormControl;
  }
  public get password(): FormControl {
    return this.form.get("password") as FormControl;
  }

  constructor(
    formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toDoService: ToDoService
  ) {
    this.form = formBuilder.group({
      email: formBuilder.control("", [Validators.required]),
      password: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    // this.authService.isAuthenticated$.subscribe(
    //   authenticated => {
    //     console.log("TCL: LoginComponent -> authenticated", authenticated);
    //     if (authenticated) {
    //       this.router.navigate(["/todoListPart"]);
    //     } else {
    //       this.router.navigate(["/login"]);
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  register() {
    if (this.form.valid) {
      // const { value: {email, password} } = this.form;
      const { email, password } = this.form.value;
      const loginDto: LoginDto = {
        email: email,
        password: password
      };
      this.toDoService
        .register(loginDto)
        .pipe(
          catchError(err => {
            alert(err.error.error);
            return throwError(err);
          })
        )
        .subscribe(
          (result: LoginViewModel) => {
            localStorage.setItem("token", result.token);
            this.authService.login(email, password);
            this.router.navigate(["/todoListPart"]);
            console.log("registered successfully");
          },
          err => {
            console.log("register err", err);
          }
        );
    }
  }
  login(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      const loginDto: LoginDto = {
        email: email,
        password: password
      };

      this.toDoService
        .login(loginDto)
        .pipe(
          catchError(err => {
            alert(err.error.error);
            return throwError(err);
          })
        )
        .subscribe(
          (result: LoginViewModel) => {
            localStorage.setItem("token", result.token);
            this.authService.login(email, password);
            this.router.navigate(["/todoListPart"]);
            console.log("logged in successfully");
          },
          err => {
            console.log("login err", err);
          }
        );
    }
  }

  switchToLogin() {
    this.showLoginBtn = true;
    this.lable = "Login";
  }
  switchToReg() {
    this.lable = "Register";
    this.showLoginBtn = false;
  }
}
