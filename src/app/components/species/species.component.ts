import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { SwapiService } from "src/app/services/swapiService/swapiService.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { PlanetsComponent } from "../planets/planets.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-species",
  templateUrl: "./species.component.html",
  styleUrls: ["./species.component.scss"]
})
export class SpeciesComponent implements OnInit {
  form: FormGroup;
  species: [] = [];
  loading: boolean = true;
  bsModalRef: BsModalRef | null;
  next: string;
  planets: Object;
  previous: string;

  constructor(
    private formBuilder: FormBuilder,
    private swapiService: SwapiService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getSpecies();
    this.form = this.formBuilder.group({ search: [""] });
  }

  async getSpecies() {
    try {
      const response = await this.swapiService.getSpecies();
      this.species = response["results"];
      this.next = response["next"];
      this.previous = response["previous"];
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.toastr.error("Erro ao consultar a api");
    }
  }

  async openModal(e) {
    try {
      const response = await this.swapiService.getByUrl(e);
      this.planets = response;

      const initialState = {
        name: this.planets["name"],
        planet: this.planets
      };

      this.bsModalRef = await this.modalService.show(PlanetsComponent, {
        initialState
      });
      this.bsModalRef.setClass("full-modal");
      this.bsModalRef.content.closeBtnName = "Sair";
    } catch (error) {
      this.toastr.error("Erro ao consultar a api");
    }
  }

  async submit() {
    try {
      this.loading = true;
      const search = this.form.controls.search.value;
      const specieName = await this.swapiService.getSpeciesByName(search);
      this.species = specieName["results"];
      this.next = specieName["next"];
      this.previous = specieName["previous"];
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
      this.species = response["results"];
      this.next = response["next"];
      this.previous = response["previous"];
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.toastr.error("Erro ao consultar a api");
    }
  }
}
