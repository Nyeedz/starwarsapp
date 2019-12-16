import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CustomFilmsService {
  constructor() {}

  get(characterUrl?: string) {
    let films = localStorage.getItem("moviesRegistered")
      ? JSON.parse(localStorage.getItem("moviesRegistered"))
      : [];
    if (characterUrl) {
      films = films.filter(film => {
        return film.people.find(character => character.url === characterUrl);
      });
    }

    return films;
  }

  createCustomMovie(movie: any) {
    console.log(movie, "Criando");
    const moviesArray = this.get();
    moviesArray.push(movie);
    this.saveCustomMovies(moviesArray);
    return moviesArray;
  }

  removeCustomMovie(index: number) {
    console.log(index, "Deletando");
    const moviesArray = this.get();
    moviesArray.splice(index, 1);
    this.saveCustomMovies(moviesArray);
    return moviesArray;
  }

  editCustomMovie(index: number, movie: any) {
    console.log(index, movie, "Editando");
    const moviesArray = this.get();
    moviesArray[index] = movie;
    this.saveCustomMovies(moviesArray);
    return moviesArray;
  }

  saveCustomMovies(movies) {
    localStorage.setItem("moviesRegistered", JSON.stringify(movies));
  }
}
