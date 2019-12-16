import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { SwapiService } from "src/app/services/swapiService/swapiService.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomFilmsService } from "src/app/services/customFilms/custom-films.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-custom-movies-modal",
  templateUrl: "./custom-movies-modal.component.html",
  styleUrls: ["./custom-movies-modal.component.scss"]
})
export class CustomMoviesModal implements OnInit {
  list: any[] = [];
  people: any[] = [];
  form: FormGroup;
  limitSelection = false;
  dropdownSettings: any = {};
  id: number;
  movie: any;

  constructor(
    private bsModalRef: BsModalRef,
    private swapiService: SwapiService,
    private fb: FormBuilder,
    private customFilmsService: CustomFilmsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: "url",
      textField: "name",
      selectAllText: "Selecionar todos",
      unSelectAllText: "Desmarcar todos",
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.form = this.fb.group({
      people: ["", Validators.required],
      title: ["", Validators.required],
      director: ["", Validators.required],
      producer: ["", Validators.required],
      opening_crawl: [""]
    });

    this.loadPeople();

    if (this.movie) {
      this.form.patchValue(this.movie);
    }
  }

  async loadPeople() {
    try {
      const response = await this.swapiService.getPeople();
      this.people = response["results"];
    } catch (error) {
      console.log(error);
      this.toastr.error("Erro ao consultar a api");
    }
  }

  submit(): void {
    if (this.id !== undefined) {
      this.customFilmsService.editCustomMovie(this.id, this.form.getRawValue());
      this.bsModalRef.hide();
    } else {
      this.customFilmsService.createCustomMovie(this.form.getRawValue());
      this.bsModalRef.hide();
    }
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
        limitSelection: 2
      });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
        limitSelection: null
      });
    }
  }
}
