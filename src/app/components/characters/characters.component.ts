import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { SwapiService } from "../../services/swapiService/swapiService.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { PlanetsComponent } from "../planets/planets.component";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-characters",
  templateUrl: "./characters.component.html",
  styleUrls: ["./characters.component.scss"]
})
export class CharactersComponent implements OnInit {
  form: FormGroup;
  people: [] = [];
  bsModalRef: BsModalRef | null;
  planets: Object;
  next: string;

  loading: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private swapiService: SwapiService,
    private modalService: BsModalService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getPeople();
    this.form = this.formBuilder.group({ search: [""] });
  }

  async getPeople() {
    try {
      const response = await this.swapiService.getPeople();
      this.people = response["results"];
      this.next = response["next"];
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
      const peopleName = await this.swapiService.getPeopleByName(search);
      this.people = peopleName["results"];
      this.loading = false;
    } catch (err) {
      this.loading = false;
      console.log(err);
    }
  }

  films(character: any) {
    this.router.navigate(["/films"], {
      queryParams: {
        films: character.films,
        name: character.name,
        url: character.url
      }
    });
  }

  async openModal(url: string) {
    try {
      const response = await this.swapiService.getByUrl(url);
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

  async nextPage() {
    this.loading = true;
    const response = await this.swapiService.getByUrl(this.next.toString());
    this.people = response["results"];
    this.next = response["next"];
    this.loading = false;
  }
}
