import { Component, OnInit, Input } from "@angular/core";
import { CustomFilmsService } from "src/app/services/customFilms/custom-films.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { CustomMoviesModal } from "../custom-movies-modal/custom-movies-modal.component";
import { FilmsDescriptionComponent } from '../films-description/films-description.component';

@Component({
  selector: "app-films",
  templateUrl: "./films.component.html",
  styleUrls: ["./films.component.scss"]
})
export class FilmsComponent implements OnInit {
  @Input() films: any[] = [];
  @Input() title: string = "";
  @Input() character: string;
  public viewedMovies: any[] = [];
  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private customFilmsService: CustomFilmsService
  ) {}
  ngOnInit() {
    this.hasWatched();
  }

  async hasWatched() {
    if (localStorage.getItem("watched")) {
      const watchedMovies = JSON.parse(localStorage.getItem("watched"));
      this.viewedMovies = watchedMovies;
    }
  }

  watched(film: string) {
    const filmsArray = localStorage.getItem("watched")
      ? JSON.parse(localStorage.getItem("watched"))
      : [];

    const index = filmsArray.findIndex(item => item == film);

    if (index === -1) {
      filmsArray.push(film);
    } else {
      filmsArray.splice(index, 1);
    }

    localStorage.setItem("watched", JSON.stringify(filmsArray));
    this.hasWatched();
  }

  editMovie(movie: any, index: number) {
    this.bsModalRef = this.modalService.show(CustomMoviesModal, {
      initialState: {
        id: index,
        movie,
        title: "Editar Filme"
      }
    });

    this.bsModalRef.content.closeBtnName = "Close";
    this.bsModalRef.content.confirmBtnName = "Editar";
    this.modalService.onHidden.subscribe((reason: string) => {
      this.films = this.customFilmsService.get(this.character);
    });
  }

  deleteMovie(index: number) {
    this.films = this.customFilmsService.removeCustomMovie(index);
  }

  filmDetail(film) {
    try {
      const initialState = {
        film
      };

      const modalRef = this.modalService.show(FilmsDescriptionComponent, {
        initialState
      });

      modalRef.setClass("full-modal");
    } catch (error) {
      console.log(error);
    }
  }
}
