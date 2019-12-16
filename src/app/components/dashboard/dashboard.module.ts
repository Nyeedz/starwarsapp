import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard.component";
import { HomeComponent } from "../home/home.component";
import { CharactersComponent } from "../characters/characters.component";
import { AuthGuard } from "src/app/guards/auth/auth.guard";
import { StarshipsComponent } from "../starships/starships.component";
import { LoadingComponent } from "../loading/loading.component";
import { SpeciesComponent } from "../species/species.component";
import { CommaToArrayPipe } from "src/app/pipes/comma-to-array.pipe";
import { TranscriptionPipe } from "src/app/pipes/transcription.pipe";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { PopoverModule } from "ngx-bootstrap/popover";
import { FilmsComponent } from "../films/films.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "/films",
        pathMatch: "full"
      },
      {
        path: "films",
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "character",
        component: CharactersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "starships",
        component: StarshipsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "species",
        component: SpeciesComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    CharactersComponent,
    SpeciesComponent,
    StarshipsComponent,
    LoadingComponent,
    CommaToArrayPipe,
    TranscriptionPipe,
    FilmsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  entryComponents: [LoadingComponent]
})
export class DashboardModule {}
