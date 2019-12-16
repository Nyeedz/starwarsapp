import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsDescriptionComponent } from './films-description.component';

describe('FilmsDescriptionComponent', () => {
  let component: FilmsDescriptionComponent;
  let fixture: ComponentFixture<FilmsDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmsDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
