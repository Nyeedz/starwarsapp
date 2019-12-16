import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-planets",
  templateUrl: "./planets.component.html",
  styleUrls: ["./planets.component.scss"]
})
export class PlanetsComponent implements OnInit {
  closeBtnName: string;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}
}
