import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { SwapiService } from "src/app/services/swapiService/swapiService.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { PlanetsComponent } from "../planets/planets.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-starships",
  templateUrl: "./starships.component.html",
  styleUrls: ["./starships.component.scss"]
})
export class StarshipsComponent implements OnInit {
  form: FormGroup;
  starShips: [] = [];
  bsModalRef: BsModalRef | null;
  loading: boolean = true;
  next: string;
  previous: string;
  isCollapsed = false;
  message: string;
  planets: Object;

  constructor(
    private formBuilder: FormBuilder,
    private swapiService: SwapiService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getStarShips();
    this.form = this.formBuilder.group({ search: [""] });
  }

  async getStarShips() {
    try {
      const response = await this.swapiService.getStarShips();
      this.starShips = response["results"];
      this.next = response["next"];
      this.previous = response["previous"];
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.toastr.error("Erro ao consultar a api");
    }
  }

  async submit() {
    try {
      this.loading = true;
      const search = this.form.controls.search.value;
      const starShipsName = await this.swapiService.getStarShipsByName(search);
      this.starShips = starShipsName["results"];
      this.next = starShipsName["next"];
      this.previous = starShipsName["previous"];
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.toastr.error("Erro ao consultar a api");
    }
  }

  async changePage(next: boolean) {
    try {
      this.loading = true;
      const response = await this.swapiService.getByUrl(
        this[next ? "next" : "previous"].toString()
      );
      this.starShips = response["results"];
      this.next = response["next"];
      this.previous = response["previous"];
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.toastr.error("Erro ao consultar a api");
    }
  }
}
