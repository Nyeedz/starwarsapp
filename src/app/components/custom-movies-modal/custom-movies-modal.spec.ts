import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomMoviesModal } from './custom-movies-modal.component';

describe('CustomMoviesModal', () => {
  let component: CustomMoviesModal;
  let fixture: ComponentFixture<CustomMoviesModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMoviesModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMoviesModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
