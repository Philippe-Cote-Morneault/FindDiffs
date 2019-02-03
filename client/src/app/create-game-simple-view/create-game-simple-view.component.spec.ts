import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateGameSimpleViewComponent } from "./create-game-simple-view.component";

describe("CreateGameSimpleViewComponent", () => {
  let component: CreateGameSimpleViewComponent;
  let fixture: ComponentFixture<CreateGameSimpleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGameSimpleViewComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGameSimpleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
