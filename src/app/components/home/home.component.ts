import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { SwapiService } from "src/app/services/swapiService/swapiService.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FilmsDescriptionComponent } from "../films-description/films-description.component";
import { CustomMoviesModal } from "../custom-movies-modal/custom-movies-modal.component";
import { CustomFilmsService } from "../../services/customFilms/custom-films.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public films: any[];
  public customFilms: [] = [];
  private navbarOpen: boolean = true;
  title: string = "Geral";
  modalRef: BsModalRef | null;
  characterUrl: string;
  loading: boolean = true;
  bsModalRef: BsModalRef;
  currentUser: string = "";
  filmDetail: Object;
  form: FormGroup;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private swapiService: SwapiService,
    private customFilmsService: CustomFilmsService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (params.films) {
        this.getFilms(params.films, params.url);
        this.title = params.name;
        this.characterUrl = params.url;
      } else {
        this.getFilms();
      }
    });

    this.form = this.fb.group({ search: [""] });
  }

  async getFilms(films?: string[], characterUrl?: string) {
    try {
      if (films) {
        const filmArray = films.map(id => this.swapiService.getByUrl(id));
        const fila = await Promise.all(filmArray);
        this.films = fila;
      } else {
        const response = await this.swapiService.getFilms();
        this.films = response["results"];
      }

      this.customFilms = this.customFilmsService.get(characterUrl);
      this.loading = false;
    } catch (error) {
      console.log(error)
      this.loading = false;
      this.toastr.error("Erro ao consultar a api");
    }
  }

  async search() {
    try {
      this.loading = true;
      const name = this.form.controls.search.value;
      const response = await this.swapiService.getFilmByName(name);
      if (this.characterUrl) {
        this.films = response["results"].filter(film => {
          return film.peoples.find(
            character => character.url === this.characterUrl
          );
        });
        this.loading = false;
      } else {
        this.films = response["results"];
        this.loading = false;
      }
    } catch (error) {
      this.loading = false;
      this.toastr.error("Erro ao consultar a api");
    }
  }

  async openModal(e) {
    try {
      const response = await this.swapiService.getByUrl(e);
      const initialState = {
        list: response
      };

      this.modalRef = await this.modalService.show(FilmsDescriptionComponent, {
        initialState
      });
      this.modalRef.content.closeBtnName = "Close";
    } catch (error) {
      this.toastr.error("Erro ao consultar a api");
      console.log(error);
    }
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  async createMovie() {
    this.bsModalRef = this.modalService.show(CustomMoviesModal, {
      initialState: {
        title: "Cadastrar Filme"
      }
    });
    this.bsModalRef.content.closeBtnName = "Close";
    this.bsModalRef.content.confirmBtnName = "Criar";

    this.modalService.onHidden.subscribe((reason: string) => {
      this.customFilms = this.customFilmsService.get(this.characterUrl);
    });
  }

  logOut() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
