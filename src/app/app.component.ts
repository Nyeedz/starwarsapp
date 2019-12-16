import { Component } from "@angular/core";
import { User } from "./models/user";
import { AuthenticationService } from "./services/authentication/authentication.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {
    this.getUserValue();
  }

  async getUserValue() {
    try {
      const response = await this.authenticationService.currentUser.toPromise();
      this.currentUser = response;
    } catch (error) {
      this.toastr.error("Erro ao consultar a api");
    }
  }
}
