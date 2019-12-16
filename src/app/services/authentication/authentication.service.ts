import { Injectable } from "@angular/core";
import { User } from "src/app/models/user";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  sign(username: any) {
    localStorage.setItem("currentUser", JSON.stringify(username));
    this.currentUserSubject.next(username);
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }
}
