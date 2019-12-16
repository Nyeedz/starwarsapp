import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class SwapiService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getFilms() {
    return this.http.get(`${this.baseUrl}/films`).toPromise();
  }

  getFilmByName(name: string) {
    return this.http.get(`${this.baseUrl}/films/?search=${name}`).toPromise();
  }

  getPeople() {
    return this.http.get(`${this.baseUrl}/people`).toPromise();
  }

  getPeopleByName(name: string) {
    return this.http.get(`${this.baseUrl}/people/?search=${name}`).toPromise();
  }

  getStarShips() {
    return this.http.get(`${this.baseUrl}/starships`).toPromise();
  }

  getStarShipsByName(name: string) {
    return this.http
      .get(`${this.baseUrl}/starships/?search=${name}`)
      .toPromise();
  }

  getSpecies() {
    return this.http.get(`${this.baseUrl}/species`).toPromise();
  }

  getSpeciesByName(name: string) {
    return this.http.get(`${this.baseUrl}/species/?search=${name}`).toPromise();
  }

  getByUrl(url) {
    return this.http.get(url).toPromise();
  }
}
