import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

// const TEST = {
//   email: "1",
//   password: "1"
// };

@Injectable()
export class AuthService {
  private authenticateEvent = new BehaviorSubject<boolean>(false);

  public get isAuthenticated$(): Observable<boolean> {
    return this.authenticateEvent.asObservable();
  }

  login(email: string, password: string): void {

    // if (TEST.email === email && TEST.password === password) {
    //   console.log("trueeee");
    //   this.authenticateEvent.next(true);
    // }
    if (localStorage.getItem('token')) {
      this.authenticateEvent.next(true);

    }
    else {
      this.authenticateEvent.next(false);
    }
  }

  logout(): any {
    // localStorage.clear();
    localStorage.removeItem('token');
    this.authenticateEvent.next(false);
  }
}
