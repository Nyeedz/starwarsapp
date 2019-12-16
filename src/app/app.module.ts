import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

import { CollapseModule } from "ngx-bootstrap/collapse";
import { ModalModule } from "ngx-bootstrap/modal";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { PopoverModule } from "ngx-bootstrap/popover";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app.component";
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";
import { FilmsDescriptionComponent } from "./components/films-description/films-description.component";
import { PlanetsComponent } from "./components/planets/planets.component";
import { CustomMoviesModal } from "./components/custom-movies-modal/custom-movies-modal.component";
import { NumberToRomanPipe } from './pipes/number-to-roman.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    FilmsDescriptionComponent,
    PlanetsComponent,
    CustomMoviesModal,
    NumberToRomanPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: [
    FilmsDescriptionComponent,
    PlanetsComponent,
    CustomMoviesModal
  ]
})
export class AppModule {}
