import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { SwapiService } from "../../services/swapiService/swapiService.service";

@Component({
  selector: "app-films-description",
  templateUrl: "./films-description.component.html",
  styleUrls: ["./films-description.component.scss"]
})
export class FilmsDescriptionComponent implements OnInit {
  data = {
    characters: {
      data: [],
      loading: true
    },
    planets: {
      data: [],
      loading: true
    },
    species: {
      data: [],
      loading: true
    },
    starships: {
      data: [],
      loading: true
    },
    vehicles: {
      data: [],
      loading: true
    }
  };
  arrays = ["characters", "planets", "species", "starships", "vehicles"];
  film: any;
  whatToShow: "characters";

  constructor(
    public bsModalRef: BsModalRef,
    public swapiService: SwapiService
  ) {}

  ngOnInit() {
    console.log(this.film);
    this.loadCharacters();
    this.loadPlanets();
    this.loadSpecies();
    this.loadStarships();
    this.loadVehicles();
  }

  async loadCharacters() {
    try {
      this.data.characters.loading = true;
      const response = await Promise.all(
        this.film.characters.map(character =>
          this.swapiService.getByUrl(character)
        )
      );
      this.data.characters.data = response;
      this.data.characters.loading = false;
    } catch (err) {}
  }

  async loadPlanets() {
    try {
      this.data.planets.loading = true;
      const response = await Promise.all(
        this.film.planets.map(planet => this.swapiService.getByUrl(planet))
      );
      this.data.planets.data = response;
      this.data.planets.loading = false;
    } catch (err) {}
  }

  async loadSpecies() {
    try {
      this.data.species.loading = true;
      const response = await Promise.all(
        this.film.species.map(specie => this.swapiService.getByUrl(specie))
      );
      this.data.species.data = response;
      this.data.species.loading = false;
    } catch (err) {}
  }

  async loadStarships() {
    try {
      this.data.starships.loading = true;
      const response = await Promise.all(
        this.film.starships.map(starship =>
          this.swapiService.getByUrl(starship)
        )
      );
      this.data.starships.data = response;
      this.data.starships.loading = false;
    } catch (err) {}
  }

  async loadVehicles() {
    try {
      this.data.vehicles.loading = true;
      const response = await Promise.all(
        this.film.vehicles.map(vehicle => this.swapiService.getByUrl(vehicle))
      );
      this.data.vehicles.data = response;
      this.data.vehicles.loading = false;
    } catch (err) {}
  }
}
