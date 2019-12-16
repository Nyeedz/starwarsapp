import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-splash-screen",
  templateUrl: "./splash-screen.component.html",
  styleUrls: ["./splash-screen.component.scss"]
})
export class SplashScreenComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({ username: ["", Validators.required] });
  }

  async submit() {
    try {
      if (this.form.invalid) return;
      const username = this.form.getRawValue();
      await this.authenticationService.sign(username);
      this.router.navigate(["/"]);
    } catch (error) {
      this.toastr.error("Erro ao consultar a api");
    }
  }
}
